/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

import fuzzy from 'fuzzy';
// import inquirer from 'inquirer'

export default async (props) => {
    const { generator, payload } = props

    await generator.prompt({
        type: 'autocomplete',
        name: 'fruit',
        suggestOnly: true,
        message: 'What is your favorite fruit?',
        searchText: 'We are searching the internet for you!',
        emptyText: 'Nothing found!',
        default: 'Banana',
        source: searchFood,
        pageSize: 4,
        validate(val) {
            return val ? true : 'Type something!';
        },
    },)

    await generator.prompt({
        type: 'autocomplete',
        name: 'state',
        message: 'Select a state to travel from',
        default: 'California',
        validate(choice, answers) {
            if (answers.fruit === 'Banana') {
                return choice && choice.value[0] === 'C'
                    ? true
                    : 'Since you selected Banana in the previous prompt you need to select a state that starts with "C". Makes sense.';
            }

            return true;
        },
        source: searchStates,
    },)

    await generator.prompt(
        {
            type: 'autocomplete',
            name: 'stateNoPromise',
            message: 'Select a state to travel to',
            source: () => states,
        },)

    // await generator.prompt({
    //     type: 'autocomplete',
    //     name: 'from',
    //     message: 'Select a state to travel from',
    //     source: async (answersSoFar, input) => `${input}-more`,
    // },)
}















const states = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District Of Columbia',
    'Federated States Of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Islands',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
];

const foods = ['Apple', 'Orange', 'Banana', 'Kiwi', 'Lichi', 'Grapefruit'];

const searchStates = (answers, input = '') => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const results = fuzzy.filter(input, states).map((el) => el.original);

            // results.splice(5, 0, new inquirer.Separator());
            // results.push(new inquirer.Separator());
            resolve(results);
        }, Math.random() * 470 + 30);
    });
}

const searchFood = (answers, input = '') => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fuzzy.filter(input, foods).map((el) => el.original));
        }, Math.random() * 470 + 30);
    });
}
