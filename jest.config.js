// module.exports = {
//     preset: 'react-native',
//     setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//     // transformIgnorePatterns: [
//     //     "node_modules/(?!(jest-)?react-native)",
//     //     "node_modules/?!(react-navigation)"
//     // ]
//     transformIgnorePatterns: [
//         'node_modules/(?!@react-native|@react-navigation)',
//     ],
// };

// reference from 
// https://stackoverflow.com/questions/73203858/how-to-test-bottom-tab-bar-using-react-native-test-library (25 Feb 2024)
module.exports = {
    preset: 'react-native',
    setupFiles: ['./setup.js'],
    transformIgnorePatterns: [
        // 'node_modules/(?!@react-native|@react-navigation)'
        'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation|@react-native-async-storage/async-storage-jest)',
    ]
};