import React from 'react';
import { render, fireEvent, act} from '@testing-library/react-native';
import HomePage from './HomePage';
import { Button } from 'react-native';

// homePage.js unit testing on user interaction
// test on the add task button on the home page
// component testing
test('Add Task Pressable onPress callback is called when it is pressed', () => {
    const { getByLabelText } = render(<HomePage />);
    const pressableElement = getByLabelText('Add Task Button');

    act(() => {
        // simulates a press action
        fireEvent.press(pressableElement);
    });

    // test whether the pop-up form will appear or not
    expect(getByLabelText('Add Task Pop-up Form')).toBeTruthy();
})

// test on the save button callback function
test('Save Button onPress callback is called when it is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button onPress={onPressMock} title='Save' />);
    const pressableElement = getByText('Save');

    act(() => {
        // simulates a press action
        fireEvent.press(pressableElement);
    });

    // test whether the function is successfully called when the button is pressed
    expect(onPressMock).toHaveBeenCalledTimes(1);
})

// test on the cancel button callback function
test('Cancel Button onPress callback is called when it is pressed', () => {
    const { getByText, getByLabelText } = render(<HomePage/>);
    const addTaskButton = getByLabelText('Add Task Button');

    // to make the add task pop-up form to be visible
    // by simulating a pressing action on the Add Task button
    fireEvent.press(addTaskButton);

    // test whether the pop-up form is successfully visible
    expect(getByLabelText('Add Task Pop-up Form')).toBeTruthy();

    act(() => {
        // simulates a press action
        fireEvent.press(getByText('Cancel'));
    });
    // test whether the function is successfully called when the button is pressed
    expect(getByText('Add Task')).toBeTruthy();
    
});