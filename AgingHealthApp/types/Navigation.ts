export type RootStackParamList = {
  Profile: undefined;
  Results: undefined;
};

export type NavigationContextType = {
  onboardingActive: boolean;
  startOnboarding: () => void;
  stopOnboarding: () => void;
};
