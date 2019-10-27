module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        // "indent": [
        //     "error",
        //     4,
        //     {
        //         "SwitchCase": 1
        //     }
        // ],
        'indent': 'off',
        'vue/script-indent': ['error', 4, {'baseIndent': 1}],
        'vue/html-indent': ['error', 4, {'baseIndent': 1}],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "space-before-function-paren": "off",
        "eqeqeq": "warn",
        "no-console": "warn",
        "no-new": "warn",
        "no-fallthrough": "warn",
        "no-unreachable": "warn",
        "no-empty": "warn",
        "no-eq-null": "warn",
        "vue/no-parsing-error": [
            2,
            {
                "x-invalid-end-tag": false
            }
        ]
    }
};