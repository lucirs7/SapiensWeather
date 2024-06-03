# Sapiens weather app

A react native app that helps user see weather from inputted location. It includes two different API web services, which user can choose from. App is developed using typescript.

## What it consists of

The app is made up of just one single screen in which the following components are placed:
- A button to allow user change API service.
- An input text to allow user enter desired location.
- A submit button.
- An image to show weather conditions (sunny, cloudy, rainy, etc.).
- A text that shows this weather status.
- A text that shows temperature value in ºC.

## How it works

User may choose API service by clicking the top button. Then it would type desired location in text input, and once it is finished, it would submit by clicking 'ok' button. This makes a call to server and weather data is returned. Once data is obtained from server response, it is shown on screen as weather status and temperature value.

## Error handling

### Wrong typing
If user types a location that the web service does not found, an error is shown on screen saying there was an error and user should check what is written. Weather icon and data texts also provide feedback.

### No internet connection
If user is not connected to a network, an error message will be shown on screen telling user to check internet connection. Weather icon and data texts also provide feedback.

## Modularity
Modularity is prioritized in the project allowing adding as many weather services as desired by managing them through an interface file. This means, any other service could be added to the code as an independent file, and it will be added to the code by simply mention it and calling its 'fetchingData' funciton in the interface file.
