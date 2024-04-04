import { PropsWithChildren, createContext, useContext, useState } from "react";
import { NavigationContextType } from "../../types/Navigation";

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

const NavigationProvider = ({ children }: PropsWithChildren) => {
  const [onboardingActive, setOnboardingActive] = useState(false);
  const startOnboarding = () => setOnboardingActive(true);
  const stopOnboarding = () => setOnboardingActive(false);
  const navigationContextValue = {
    onboardingActive,
    startOnboarding,
    stopOnboarding,
  };

  return (
    <NavigationContext.Provider value={navigationContextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export function useNav() {
  const nav = useContext(NavigationContext);
  if (!nav) {
    throw new Error("useNav must be used within NavigationContext");
  }
  return nav;
}

export default NavigationProvider;
