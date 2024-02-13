background_variables = ['longill', 'limitact', 'effort', 'smkevr', 'smknow', 'mobility', 'country',
                        'alcohol', 'jointrep', 'fractures' , 'height', 'bmi', 'ethnicity','sex',
                        'BP med', 'anticoagulent med', 'chol med', 'hip/knee treat', 'lung/asthma med']

health_variables = ['gait_speed', 'grip_dom', 'grip_ndom', 'FI_ADL', 'FI_IADL', 'chair','leg_raise', 
                    'full_tandem', 'srh', 'eye', 'hear', 'func', 'dias', 'sys', 'pulse', 'trig', 'crp',
                    'hdl','ldl','glucose','igf1','hgb','fib','fer', 'chol', 'wbc', 'mch', 'hba1c', 'vitd']

quarter_months = { month: [((month-1)//3)*3+1+i for i in range(3)] for month in range(1, 13) }

qual_to_quant = {
  "gait_speed": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "grip_dom": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "grip_ndom": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "chair": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "leg_raise": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "full_tandem": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "dias": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "sys": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "pulse": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "trig": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  }, 
  "crp": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "hdl": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "ldl": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "glucose": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "igf1": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
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
  "chol": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
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
  "hba1c": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
  "vitd": {
    0: 10,
    1: 20,
    2: 30,
    3: 30,
    4: 40
  },
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
}