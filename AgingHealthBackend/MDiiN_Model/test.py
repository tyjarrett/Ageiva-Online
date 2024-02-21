from Model.model import Model
import os
import torch
import numpy as np
import pandas as pd


job_id = 322
epoch = 1999
dir = os.path.dirname(os.path.realpath(__file__))
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
N = 29
num_env = 14
num_med = 5
gamma_size = 25
z_size = 20
decoder_size = 65
Nflows = 3
flow_hidden = 24
f_nn_size = 12
W_prior_scale = 0.1
mean_T, std_T = np.load(f"{dir}/Averages/T_stats.npy")
pop_avg = np.load(f"{dir}/Averages/Population_averages.npy")
pop_avg = torch.from_numpy(pop_avg[...,1:]).float()
pop_std = np.load(f"{dir}/Averages/Population_std.npy")
pop_std = torch.from_numpy(pop_std[...,1:]).float()
dt = 0.5
prediction_length = 50


# sample data
deficits = ['gait speed', 'grip dom', 'grip ndom', 'FI ADL', 'FI IADL', 'chair','leg raise', 'full tandem', 'srh', 'eye',
          'hear', 'func', 'dias', 'sys', 'pulse', 'trig',
         'crp','hdl','ldl','glucose','igf1','hgb','fib','fer', 'chol', 'wbc', 'mch', 'hba1c', 'vitd']
        
medications = ['BP med', 'anticoagulent med', 'chol med', 'hip/knee treat', 'lung/asthma med']
        
background = ['longill', 'limitact', 'effort', 'smkevr', 'smknow', 'mobility', 'country',
              'alcohol', 'jointrep', 'fractures' , 'height', 'bmi', 'ethnicity','sex']
orig_data = pd.read_csv(f"{dir}/test.csv",usecols=['id', 'wave' , 'age']+deficits+medications+background+['death age'])
health_data = orig_data[deficits].to_numpy().flatten()
env = orig_data[background].to_numpy().flatten() # last two must be ethnicity and sex
med = orig_data[medications].to_numpy().flatten()

data_mask = (health_data > -100).astype(int)
env_mask = (env[:-2] > -100).astype(int)
med_mask = (med > -100).astype(int)
env[:-2] *= env_mask
med *= med_mask
env_with_mask = np.concatenate((env, env_mask))
med_with_mask = np.concatenate((med, med_mask))
sex_index = env[num_env-1].astype(int)
predict_missing = pop_avg[sex_index, 0]
pop_std = pop_std[sex_index, 0]

data = {
  'y0': torch.Tensor(health_data).unsqueeze(0).float(),
  't0': torch.Tensor([60]).float(),
  'mask': torch.from_numpy(data_mask).unsqueeze(0).float(),
  'env': torch.from_numpy(env_with_mask).unsqueeze(0).float(),
  'med0': torch.from_numpy(med_with_mask).unsqueeze(0).float(),
  'predict_missing': predict_missing.unsqueeze(0).float(),
  'pop_std': pop_std.unsqueeze(0).float(),
}

model = Model(device, N, gamma_size, z_size, 
              decoder_size, Nflows, flow_hidden, 
              f_nn_size, mean_T, std_T, dt, prediction_length)
model.load_state_dict(torch.load(f"{dir}/Parameters/train{job_id}_Model_DJIN_epoch{epoch}.params", map_location=device))
model = model.eval()
print("predicting...")
pred_X, t, pred_S, pred_logGamma, pred_sigma_X, context, mask, env, z_sample, prior_entropy, log_det, recon_mean_x0, drifts, mean = model(data)
print("prediction:")
print(pred_X[0][0])
print("survival prediction:")
print(pred_S[0])