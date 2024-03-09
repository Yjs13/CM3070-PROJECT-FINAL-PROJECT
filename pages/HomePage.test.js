import React from 'react';
import { render, fireEvent, act, waitFor} from '@testing-library/react-native';
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
    
})

// test on the edit task feature
// test('Edit task feature modifies the task correctly', () => {
//     const { getByText, getByLabelText, getByPlaceholderText } = render(<HomePage />);
//     const addTaskButton = getByLabelText('Add Task Button');

//     // add new task into the list //

//     // to make the add task pop-up form to be visible
//     // by simulating a pressing action on the Add Task button
//     fireEvent.press(addTaskButton);
//     // simulate the event of adding new task with the title of 'Task 1'
//     fireEvent.changeText(getByPlaceholderText('Title'), 'Task 1');
//     // simulate the action of user pressing the save button
//     fireEvent.press(getByText('Save'));

//     fireEvent.press(getByLabelText('task pressable'));
//     fireEvent.changeText(getByPlaceholderText('Task 1'), 'Modified Task');
//     fireEvent.press(getByText('Save'));

//     // test whether the title for the task list matches the title that user have set
//     expect(getByText('Modified Task')).toBeTruthy();
// })

// test('Button onPress callback is called when pressed', () => {
//     const onPressMock = jest.fn();
//     const { getByText } = render(<Button onPress={onPressMock} title="Click Me" />);
//     const buttonElement = getByText('Click Me');

//     fireEvent.press(buttonElement);

//     expect(onPressMock).toHaveBeenCalledTimes(1);
// });
