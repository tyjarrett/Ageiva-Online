import os
import pandas as pd

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
  return q2q

# srh, eye, hear, and func should be normalized
def normalize_qual(num_options):
  return {i : i/(num_options-1) for i in range(num_options)}

# for variables where values are in ascending order with baseline in the first index
def increasing_qual_to_quant(variable_name, num_options):
  formatted_var = variable_name.replace('_', ' ') 
  mean = mean_deficits.loc[formatted_var].iat[0]
  std = std_deficits.loc[formatted_var].iat[0]
  return {i : mean+i*std for i in range(num_options)}


qual_to_quant = {
  "gait_speed": standard_qual_to_quant("gait_speed", 5),
  "grip_dom": standard_qual_to_quant("grip_dom", 5),
  "grip_ndom": standard_qual_to_quant("grip_ndom", 5),
  "chair": standard_qual_to_quant("chair", 5),
  "leg_raise": { #****
    0: 10,
    1: 20,
    2: 30,
  },
  "full_tandem": { #****
    0: 10,
    1: 20,
    2: 30,
  },
  "dias": standard_qual_to_quant("dias", 5),
  "sys": standard_qual_to_quant("sys", 5),
  "pulse": standard_qual_to_quant("pulse", 5),
  "trig": increasing_qual_to_quant("trig", 4), 
  "crp": increasing_qual_to_quant("crp", 5),
  "hdl": standard_qual_to_quant("hdl", 3, reverse=True),
  "ldl": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  }, #****
  "glucose": increasing_qual_to_quant("glucose", 3),
  "igf1": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  }, #****
  "hgb": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "fib": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "fer": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "chol": increasing_qual_to_quant("chol", 3),
  "wbc": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "mch": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "hba1c": increasing_qual_to_quant("hba1c", 3),
  "vitd": standard_qual_to_quant("vitd", 3),
  "height": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "bmi": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  # purely qual variables should be normalized
  'srh': normalize_qual(5), 
  'eye': normalize_qual(6), 
  'hear': normalize_qual(5), 
  'func': normalize_qual(4)
}