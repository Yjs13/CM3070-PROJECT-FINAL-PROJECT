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

module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
        // 'node_modules/(?!@react-native|@react-navigation)'
        'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
    ]
};