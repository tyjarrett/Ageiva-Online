export const onboardSlides = [
  {
    title: "Welcome to AppName!",
    text: "With this app, you enter health data, and we’ll predict how that data will evolve over the years.",
    image: require("../assets/help_images/1_.png"),
  },
  {
    title: "Enter Data",
    text: "Start by visiting the profile page to enter your data for the first time",
    image: require("../assets/help_images/2_.png"),
  },
  {
    title: "Enter Data",
    text: "This will take you to a survey with some health questions. Answer them to the best of your ability, the more data we have the better the predictions will be.",
    image: require("../assets/help_images/3_.png"),
  },
  {
    title: "Enter Data",
    text: "If you aren’t sure of the exact value of a health variable, you can click the “Provide an Estimate Instead” button and choose from the options. If you don’t have an estimate, you can click “Next” and skip the question.",
    image: require("../assets/help_images/4_.png"),
  },
  {
    title: "Enter Data",
    text: "At any point, you can click the “Save and Complete” button to leave in the middle of the questions. Note this won’t change your predictions; predictions are only updated when you go through all the questions and submit your answers.",
    image: require("../assets/help_images/5_.png"),
  },
  {
    title: "View Results",
    text: "After you finish the questions and submit the responses you should be able to visit the Results page. By default, this page shows you your survival score, which is an indicator of general health.",
    image: require("../assets/help_images/6_.png"),
  },
  {
    title: "View Results",
    text: "You can select which health variables are shown by clicking the “Filter” button. From this menu, select all health variables that you wish to see and then click “Close”.",
    image: require("../assets/help_images/7_.png"),
  },
  {
    title: "View Results",
    text: "You can now scroll through all the variables that you selected. Press and hold on any graph to get more detailed information on the prediction.",
    image: require("../assets/help_images/8_.png"),
  },
] as const;
