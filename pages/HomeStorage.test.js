// adapt from Tia Eastwood, Posted on 20 Jan 2023 • Updated on 31 Mar 2023
// https://dev.to/tiaeastwood/how-to-mock-and-test-asyncstorage-in-react-native-4kil (8 Mar 2024)
import React from 'react';
import { render, fireEvent, act, waitFor, cleanup } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import HomePage from './HomePage';

describe("<HomePage />", () => {
    beforeEach(async () => {
        // set up the storage 
        await AsyncStorage.setItem('checklist', JSON.stringify([]));
        await AsyncStorage.setItem('ticks', JSON.stringify([]));
        await AsyncStorage.setItem('taskInfo', JSON.stringify([]));
    });

    afterEach(() => {
        cleanup();
    });

    // homePage.js unit testing on user interaction
    // Async storage testing
    // test whether the handleNewTask function works correctly
    // test on whether the correct value is set into the useState
    it('handleNewTask function handles values correctly', async () => {
        const { getByText, getByPlaceholderText, getByLabelText } = render(<HomePage/>);
        const addTaskButton = getByLabelText('Add Task Button');

        // to make the add task pop-up form to be visible
        // by simulating a pressing action on the Add Task button
        fireEvent.press(addTaskButton);

        // test whether the pop-up form is successfully visible
        expect(getByLabelText('Add Task Pop-up Form')).toBeTruthy();

        act(() => {
            // simulate the event of adding new task with the title of 'Task 1'
            fireEvent.changeText(getByPlaceholderText('Title'), 'Task 1');
        });

        await act(() => {
            // simulate the action of user pressing the save button
            fireEvent.press(getByText('Save'));
        })

        await waitFor(() => {
            // test whether the title for the task list matches the title that user have set
            expect(getByText('Task 1')).toBeTruthy();
        });
    });

    it('CheckBox can be checked and unchecked successfully', async () => {
        const { getByText, getByLabelText, getByPlaceholderText } = render(<HomePage />);
        const addTaskButton = getByLabelText('Add Task Button');

        // add new task into the list //

        // to make the add task pop-up form to be visible
        // by simulating a pressing action on the Add Task button
        fireEvent.press(addTaskButton);
        act(() => {
            // simulate the event of adding new task with the title of 'Task 2'
            fireEvent.changeText(getByPlaceholderText('Title'), 'Task 2');
        });

        await act(() => {
            // simulate the action of user pressing the save button
            fireEvent.press(getByText('Save'));
        })

        await waitFor(() => {
            // test whether the title for the task list matches the title that user have set
            expect(getByText('Task 2')).toBeTruthy();
        });

        // test on the checkbox feature //
        await act(() => {
            // when a new task is successfully appear in the list
            // simulate a press action to click the checkbox
            fireEvent.press(getByLabelText('uncheck box button'));
        });

        await waitFor(() => {
            // test whether the checkbox is successfully checked when the button is pressed
            // test check icon to appear when user pressed on the checkbox
            expect(getByLabelText('check icon')).toBeTruthy();
        })

        // simulate a press action on the checked checkbox to uncheck the button
        fireEvent.press(getByLabelText('checked box button'));

        await waitFor(() =>{
            // test whether the checkbox is successfully unchecked when the button is pressed
            // test whether check icon disappear when user pressed on the checkbox
            expect(getByLabelText('uncheck box button')).toBeTruthy();
        })
    });

    it('handleModTask function handles values correctly', async () => {
        const { getByText, getByLabelText, getByPlaceholderText, getByDisplayValue } = render(<HomePage />);
        const addTaskButton = getByLabelText('Add Task Button');

        // add new task into the list //

        // to make the add task pop-up form to be visible
        // by simulating a pressing action on the Add Task button
        fireEvent.press(addTaskButton);
        act(() => {
            // simulate the event of adding new task with the title of 'Task 3'
            fireEvent.changeText(getByPlaceholderText('Title'), 'Task 3');
        });

        await act(() => {
            // simulate the action of user pressing the save button
            fireEvent.press(getByText('Save'));
        })

        await waitFor(() => {
            // test whether the title for the task list matches the title that user have set
            expect(getByText('Task 3')).toBeTruthy();
        });

        // test on the edit task feature //
        await act(() => {
            // when a new task is successfully appear in the list
            // simulate a press action to click the task pressable
            fireEvent.press(getByLabelText('task pressable'));
        });

        await waitFor(() => {
            // test whether the checkbox is successfully checked when the button is pressed
            // test check icon to appear when user pressed on the checkbox
            expect(getByLabelText('Edit Task Pop-up Form')).toBeTruthy();
        })

        // simulate the event of modifying task with a new title of 'New Task 3'
        fireEvent.changeText(getByDisplayValue('Task 3'), 'New Task 3');

        await act(()=> {
            // simulate the event of adding extra task information which is the description
            fireEvent.changeText(getByPlaceholderText('Description'), 'Hello');
        })

        await act(() => {
            // simulate the action of user pressing the save button
            fireEvent.press(getByText('Save'));
        })

        await waitFor(() =>{
            // test whether the title for the task list matches the new title that user have modified
            expect(getByText('New Task 3')).toBeTruthy();
        })
    });

    it('handleDeleteTask function handles values correctly', async () => {
        const removeTaskMock = jest.fn();
        Alert.alert = jest.fn();
        const { getByText, getByLabelText, getByPlaceholderText} = render(<HomePage />);
        const addTaskButton = getByLabelText('Add Task Button');

        // add new task into the list //

        // to make the add task pop-up form to be visible
        // by simulating a pressing action on the Add Task button
        fireEvent.press(addTaskButton);
        act(() => {
            // simulate the event of adding new task with the title of 'Task 4'
            fireEvent.changeText(getByPlaceholderText('Title'), 'Task 4');
        });

        await act(() => {
            // simulate the action of user pressing the save button
            fireEvent.press(getByText('Save'));
        })

        await waitFor(() => {
            // test whether the title for the task list matches the title that user have set
            expect(getByText('Task 4')).toBeTruthy();
        });

        // test on the edit task feature //
        await act(() => {
            // when a new task is successfully appear in the list
            // simulate a press action to click the task pressable
            fireEvent.press(getByLabelText('task pressable'));
        });

        await waitFor(() => {
            // test whether the checkbox is successfully checked when the button is pressed
            // test check icon to appear when user pressed on the checkbox
            expect(getByLabelText('Edit Task Pop-up Form')).toBeTruthy();
        })

        await act(()=> {
            // simulate the action of user pressing the delete button
            fireEvent.press(getByText('Delete'));
        })

        // stimulate pressing the delete in the alert
        Alert.alert.mock.calls[0][2][1].onPress();
        await waitFor(() =>{
            expect(getByLabelText('Add Task Button')).toBeTruthy();
        })
    });
});