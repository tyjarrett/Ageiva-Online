import os
import pandas as pd
import math

background_variables = ['longill', 'limitact', 'effort', 'smkevr', 'smknow', 'mobility', 'country',
                        'alcohol', 'jointrep', 'fractures' , 'height', 'bmi', 'ethnicity','sex',
                        'BP_med', 'anticoagulant_med', 'chol_med', 'hipknee_treat', 'lungasthma_med']

health_variables = ['gait_speed', 'grip_dom', 'grip_ndom', 'FI_ADL', 'FI_IADL', 'chair','leg_raise', 
                    'full_tandem', 'srh', 'eye', 'hear', 'func', 'dias', 'sys', 'pulse', 'trig', 'crp',
                    'hdl','ldl','glucose','igf1','hgb','fib','fer', 'chol', 'wbc', 'mch', 'hba1c', 'vitd']

log_scale_vars = ['fer','trig','crp', 'wbc', 'mch', 'vitd', 'dheas', 'leg_raise', 'full_tandem']

quarter_months = { month: [((month-1)//3)*3+1+i for i in range(3)] for month in range(1, 13) }

dir = os.path.dirname(os.path.realpath(__file__))
mean_deficits = pd.read_csv(f"{dir}/../MDiiN_Model/Averages/mean_deficits.txt", index_col=0)
std_deficits = pd.read_csv(f"{dir}/../MDiiN_Model/Averages/std_deficits.txt", index_col=0)


# for variables where values are in ascending (reverse=True for descending) order with the average in the middle
def standard_qual_to_quant(variable_name, num_options, reverse=False):
  formatted_var = variable_name.replace('_', ' ') 
  mean = mean_deficits.loc[formatted_var].iat[0]
  std = std_deficits.loc[formatted_var].iat[0]
  if reverse:
    std = -std
  mean_index = num_options//2
  q2q = {mean_index: mean}
  d_mean = std
  i = 1
  while mean_index+i < num_options:
    q2q[mean_index+i] = mean+d_mean
    q2q[mean_index-i] = mean-d_mean
    d_mean += std
    i += 1
  if 0 not in q2q:
    q2q[0] = mean-d_mean
  return q2q

# srh, eye, hear, and func should be normalized
def normalize_qual(num_options):
  return {i : i/(num_options-1) for i in range(num_options)}

# for variables where values are in ascending order with baseline in the first index
def sequential_qual_to_quant(variable_name, num_options, reverse=False):
  formatted_var = variable_name.replace('_', ' ')
  mean = mean_deficits.loc[formatted_var].iat[0]
  std = std_deficits.loc[formatted_var].iat[0]
  order = range(num_options) if not reverse else range(num_options-1, -1, -1)
  return {i : mean+i*std for i in order}

# hard-coded values are gotten from design doc, other values are derived from the population mean and std
qual_to_quant = {
  "gait_speed": standard_qual_to_quant("gait_speed", 6),
  "grip_dom": standard_qual_to_quant("grip_dom", 5),
  "grip_ndom": standard_qual_to_quant("grip_ndom", 5),
  "chair": standard_qual_to_quant("chair", 5),
  "leg_raise": {
    0: math.log(10),
    1: math.log(20),
    2: math.log(30),
  },
  "full_tandem": {
    0: math.log(10),
    1: math.log(20),
    2: math.log(30),
  },
  "dias": standard_qual_to_quant("dias", 5),
  "sys": standard_qual_to_quant("sys", 5),
  "pulse": standard_qual_to_quant("pulse", 5),
  "trig": {
    0: math.log(1.4),
    1: math.log(1.8),
    2: math.log(2.4),
    3: math.log(5.6)
  }, 
  "crp": {
    0: .3,
    1: 1.0,
    2: 10.0,
    3: 25.0,
    4: 50.0,
  },
  "hdl": {
    0: 1.5,
    1: 1.25,
    2: 1.0
  },
  "ldl": {
    0: 5.0,
    1: 4.0,
    2: 3.0,
    3: 2.0,
    4: 1.0
  },
  "glucose": {
    0: 5.6,
    1: 6.2,
    2: 7.2
  },
  "igf1": standard_qual_to_quant("igf1", 5), #****
  "hgb": standard_qual_to_quant("hgb", 5), #****
  "fib": standard_qual_to_quant("fib", 5), #****
  "fer": standard_qual_to_quant("fer", 5), #****
  "chol": {
    0: 5.0,
    1: 6.0,
    2: 7.0
  },
  "wbc": standard_qual_to_quant("wbc", 5), #****
  "mch": standard_qual_to_quant("mch", 5), #****
  "hba1c": {
    0: 5.0,
    1: 6.0,
    2: 7.0
  },
  "vitd": {
    math.log(20),
    math.log(40),
    math.log(80),
    math.log(160)
  },
  "height": standard_qual_to_quant("height", 5),
  "bmi": {
    0: 17.5,
    1: 22.0,
    2: 27.0,
    3: 31.0
  },
  # purely qual variables should be normalized
  'srh': normalize_qual(5), 
  'eye': normalize_qual(6), 
  'hear': normalize_qual(5), 
  'func': normalize_qual(4)
}