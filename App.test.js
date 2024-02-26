// accessible, query variants, act()
// https://reactnative.dev/docs/accessibility
// https://callstack.github.io/react-native-testing-library/docs/api-queries#query-variants
// https://medium.com/@AbbasPlusPlus/react-testing-library-understanding-act-and-when-to-use-it-301bd06fd1bc
// unit testing on the task manager application component
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import App from './App';

// testing on user interaction on App.js
// this is to test whether the bottom navigation buttons works as expected //
// this is to test Home Tab Bar
test('Home Bottom Navigation Tab navigate to home page correctly', () => {
    const { getByLabelText } = render(<App />);
    // serve as a tab bar press action
    // Home, tab, 1 of 3 is the default accessibilityLabel for the Home Bottom Tab Bar
    // act() is used when there is a react state updates error 
    act(() => {
        fireEvent.press(getByLabelText('Home, tab, 1 of 3'));
    });
    // checks whether after pressing the button will lead to the Home Page or not
    expect(getByLabelText('Home Page View')).toBeTruthy();
})
// this is to test Calendar Tab Bar
test('Calendar Bottom Navigation Tab navigate to calendar page correctly', () => {
    const { getByLabelText } = render(<App />);
    // serve as a tab bar press action 
    // Calendar, tab, 2 of 3 is the default accessibilityLabel for the Calendar Bottom Tab Bar
    act(() => {
        fireEvent.press(getByLabelText('Calendar, tab, 2 of 3'));
    });
    // checks whether after pressing the button will lead to the Calendar Page or not
    expect(getByLabelText('Calendar Page View')).toBeTruthy();
})
// this is to test Profile Tab Bar
test('Profile Bottom Navigation Tab navigate to profile page correctly', () => {
    const { getByLabelText } = render(<App />);
    // serve as a tab bar press action 
    // Profile, tab, 2 of 3 is the default accessibilityLabel for the Profile Bottom Tab Bar
    act(() => {
        fireEvent.press(getByLabelText('Profile, tab, 3 of 3'));
    });
    // checks whether after pressing the button will lead to the Profile Page or not
    expect(getByLabelText('Profile Page View')).toBeTruthy();
})

// test('TextComponent renders correctly', () => {
//     const { getByText } = render(<ProfilePage />);
//     const textElement = getByText('Profile Page');
//     expect(textElement).toBeDefined();
// });


// test('Button onPress callback is called when pressed', () => {
//     const onPressMock = jest.fn();
//     const { getByText } = render(<Button onPress={onPressMock} title="Click Me" />);
//     const buttonElement = getByText('Click Me');

//     fireEvent.press(buttonElement);

//     expect(onPressMock).toHaveBeenCalledTimes(1);
// });