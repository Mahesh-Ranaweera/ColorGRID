/*
* App data
 */
var info_data = {
    sections: [
        {
            label: "App Preview",
            content: "",
        },
        {
            label: "About",
            content: `<p class="about_desc">Made with &#10084; by Mahesh</p><p class="about_desc">https://github.com/Mahesh-Ranaweera</p>`,
        },
        {
            label: "Credit",
            content: `<p class="about_desc">Credit goes to following open-source libraries and packages</p><p class="about_desc">Simplebar(http://grsmto.github.io/simplebar/)</p><p class="about_desc">Tippy(https://atomiks.github.io/tippyjs/)</p>`,
        },
    ]
}

/**
 * Define the necessary buttons
 */
var pg_btns = {
    //ui btns
    btns : [
        {
            name: 'home',
            icon: '',
            value: 'home',
        },{
            name: 'shades',
            icon: '',
            value: 'shades',
        },{
            name: 'swatches',
            icon: '',
            value: 'swatches',
        }
    ]
}

/**
 * Colors
 */
/**
 * Colors
 */

var colors = {
    reds: [
        'FFCCBC',
        'FFAC9C',
        'FF8C7C',
        'FF7C6C',
        'FF6C5C',
        'F75C4C',
        'E74C3C',
        'D73C2C',
        'C72C1C',
        '870000',
        'A70C00',
        '870000',
    ],
    pinks: [
        'ffbcd8',
        'ff8cc8',
        'ff7cb8',
        'ff6ca8',
        'fa5c98',
        'ea4c88',
        'da3c78',
        'ca2c68',
        'ba1c58',
        'aa0c48',
        '9a0038',
        '8a0028',
    ],
    purple: [
        'DCC6E0',
        'cea0e4',
        'BE90D4',
        'ab69c6',
        '9b59b6',
        '8E44AD',
        '7e349d',
        '6e248d',
        '5e147d',
        '4e046d',
        '3e005d',
        '1e003d',
    ],
    blue: [
        '39d5ff',
        '29c5ff',
        '19B5FE',
        '22A7F0',
        '1297e0',
        '0287d0',
        '0077c0',
        '0067b0',
        '0057a0',
        '004790',
        '003780',
        '102770',
    ],
    teal: [
        '5efaf7',
        '51f5ea',
        '47ebe0',
        '37dbd0',
        '27cbc0',
        '17bbb0',
        '07aba0',
        '009b90',
        '008b80',
        '007b70',
        '106b60',
        '005b50',
    ],
    green: [
        '8effc1',
        '5efca1',
        '4eec91',
        '3edc81',
        '2ecc71',
        '1ebc61',
        '0eac51',
        '009c41',
        '008c31',
        '007c21',
        '006c11',
        '005c01',
    ],
    yellow: [
        'FDE3A7',
        'ffcf4b',
        'F9BF3B',
        'f9b32f',
        'F5AB35',
        'F39C12',
        'f1892d',
        'e67e22',
        'd87400',
        'c86400',
        'b85400',
        'a84410',
    ],
    orange: [
        'ffdcb5',
        'ffc29b',
        'ffc29b',
        'ffa27b',
        'ff926b',
        'f3825b',
        'e3724b',
        'd3623b',
        'c3522b',
        'b3421b',
        'a3320b',
        '932210',
    ],
    brown: [
        'f6c4a3',
        'eab897',
        'dfad8c',
        'd4a281',
        'ce9c7b',
        'be8c6b',
        'ae7c5b',
        '9e6c4b',
        '8e5c3b',
        '7e4c2b',
        '6e3c1b',
        '5e2c0b',
    ],
    gray: [
        'c5d3e2',
        'bccad9',
        'acbac9',
        '9caab9',
        '8c9aa9',
        '8c9aa9',
        '6C7A89',
        '5c6a79',
        '4c5a69',
        '3c4a59',
        '2c3a49',
        '1c2a39',
    ],
    ash: [
        'd5e5e6',
        'c5d5d6',
        'b5c5c6',
        'a5b5b6',
        '95a5a6',
        '859596',
        '758586',
        '657576',
        '556566',
        '455556',
        '354546',
        '253536',
    ],
    black: [
        'e0e0e0',
        'd0d0d0',
        'c0c0c0',
        'a0a0a0',
        '909090',
        '808080',
        '707070',
        '606060',
        '505050',
        '404040',
        '303030',
        '000000',
    ],
}

/*
 * material colors
 */
// var materialcolors = {
//     "red": {
//         "ffebee",
//         "ffcdd2",
//         "ef9a9a",
//         "e57373",
//         "ef5350",
//         "f44336",
//         "e53935",
//         "d32f2f",
//         "c62828",
//         "b71c1c",
//         "ff8a80",
//         "ff5252",
//         "ff1744",
//         "d50000"
//     },
//     "pink": {
//         "fce4ec",
//         "f8bbd0",
//         "f48fb1",
//         "f06292",
//         "ec407a",
//         "e91e63",
//         "d81b60",
//         "c2185b",
//         "ad1457",
//         "880e4f",
//         "ff80ab",
//         "ff4081",
//         "f50057",
//         "c51162"
//     },
//     "purple": {
//         "f3e5f5",
//         "e1bee7",
//         "ce93d8",
//         "ba68c8",
//         "ab47bc",
//         "9c27b0",
//         "8e24aa",
//         "7b1fa2",
//         "6a1b9a",
//         "4a148c",
//         "ea80fc",
//         "e040fb",
//         "d500f9",
//         "aa00ff"
//     },
//     "deeppurple": {
//         "ede7f6",
//         "d1c4e9",
//         "b39ddb",
//         "9575cd",
//         "7e57c2",
//         "673ab7",
//         "5e35b1",
//         "512da8",
//         "4527a0",
//         "311b92",
//         "b388ff",
//         "7c4dff",
//         "651fff",
//         "6200ea"
//     },
//     "indigo": {
//         "e8eaf6",
//         "c5cae9",
//         "9fa8da",
//         "7986cb",
//         "5c6bc0",
//         "3f51b5",
//         "3949ab",
//         "303f9f",
//         "283593",
//         "1a237e",
//         "8c9eff",
//         "536dfe",
//         "3d5afe",
//         "304ffe"
//     },
//     "blue": {
//         "e3f2fd",
//         "bbdefb",
//         "90caf9",
//         "64b5f6",
//         "42a5f5",
//         "2196f3",
//         "1e88e5",
//         "1976d2",
//         "1565c0",
//         "0d47a1",
//         "82b1ff",
//         "448aff",
//         "2979ff",
//         "2962ff"
//     },
//     "lightblue": {
//         "e1f5fe",
//         "b3e5fc",
//         "81d4fa",
//         "4fc3f7",
//         "29b6f6",
//         "03a9f4",
//         "039be5",
//         "0288d1",
//         "0277bd",
//         "01579b",
//         "80d8ff",
//         "40c4ff",
//         "00b0ff",
//         "0091ea"
//     },
//     "cyan": {
//         "e0f7fa",
//         "b2ebf2",
//         "80deea",
//         "4dd0e1",
//         "26c6da",
//         "00bcd4",
//         "00acc1",
//         "0097a7",
//         "00838f",
//         "006064",
//         "84ffff",
//         "18ffff",
//         "00e5ff",
//         "00b8d4"
//     },
//     "teal": {
//         "e0f2f1",
//         "b2dfdb",
//         "80cbc4",
//         "4db6ac",
//         "26a69a",
//         "009688",
//         "00897b",
//         "00796b",
//         "00695c",
//         "004d40",
//         "a7ffeb",
//         "64ffda",
//         "1de9b6",
//         "00bfa5"
//     },
//     "green": {
//         "e8f5e9",
//         "c8e6c9",
//         "a5d6a7",
//         "81c784",
//         "66bb6a",
//         "4caf50",
//         "43a047",
//         "388e3c",
//         "2e7d32",
//         "1b5e20",
//         "b9f6ca",
//         "69f0ae",
//         "00e676",
//         "00c853"
//     },
//     "lightgreen": {
//         "f1f8e9",
//         "dcedc8",
//         "c5e1a5",
//         "aed581",
//         "9ccc65",
//         "8bc34a",
//         "7cb342",
//         "689f38",
//         "558b2f",
//         "33691e",
//         "ccff90",
//         "b2ff59",
//         "76ff03",
//         "64dd17"
//     },
//     "lime": {
//         "f9fbe7",
//         "f0f4c3",
//         "e6ee9c",
//         "dce775",
//         "d4e157",
//         "cddc39",
//         "c0ca33",
//         "afb42b",
//         "9e9d24",
//         "827717",
//         "f4ff81",
//         "eeff41",
//         "c6ff00",
//         "aeea00"
//     },
//     "yellow": {
//         "fffde7",
//         "fff9c4",
//         "fff59d",
//         "fff176",
//         "ffee58",
//         "ffeb3b",
//         "fdd835",
//         "fbc02d",
//         "f9a825",
//         "f57f17",
//         "ffff8d",
//         "ffff00",
//         "ffea00",
//         "ffd600"
//     },
//     "amber": {
//         "fff8e1",
//         "ffecb3",
//         "ffe082",
//         "ffd54f",
//         "ffca28",
//         "ffc107",
//         "ffb300",
//         "ffa000",
//         "ff8f00",
//         "ff6f00",
//         "ffe57f",
//         "ffd740",
//         "ffc400",
//         "ffab00"
//     },
//     "orange": {
//         "fff3e0",
//         "ffe0b2",
//         "ffcc80",
//         "ffb74d",
//         "ffa726",
//         "ff9800",
//         "fb8c00",
//         "f57c00",
//         "ef6c00",
//         "e65100",
//         "ffd180",
//         "ffab40",
//         "ff9100",
//         "ff6d00"
//     },
//     "deeporange": {
//         "fbe9e7",
//         "ffccbc",
//         "ffab91",
//         "ff8a65",
//         "ff7043",
//         "ff5722",
//         "f4511e",
//         "e64a19",
//         "d84315",
//         "bf360c",
//         "ff9e80",
//         "ff6e40",
//         "ff3d00",
//         "dd2c00"
//     },
//     "brown": {
//         "efebe9",
//         "d7ccc8",
//         "bcaaa4",
//         "a1887f",
//         "8d6e63",
//         "795548",
//         "6d4c41",
//         "5d4037",
//         "4e342e",
//         "3e2723"
//     },
//     "grey": {
//         "fafafa",
//         "f5f5f5",
//         "eeeeee",
//         "e0e0e0",
//         "bdbdbd",
//         "9e9e9e",
//         "757575",
//         "616161",
//         "424242",
//         "212121"
//     },
//     "bluegrey": {
//         "eceff1",
//         "cfd8dc",
//         "b0bec5",
//         "90a4ae",
//         "78909c",
//         "607d8b",
//         "546e7a",
//         "455a64",
//         "37474f",
//         "263238"
//     }
// }

var materialcolors = {
    colors: [
    "ffebee",
    "ffcdd2",
    "ef9a9a",
    "e57373",
    "ef5350",
    "f44336",
    "e53935",
    "d32f2f",
    "c62828",
    "b71c1c",
    "ff8a80",
    "ff5252",
    "ff1744",
    "d50000",
    "fce4ec",
    "f8bbd0",
    "f48fb1",
    "f06292",
    "ec407a",
    "e91e63",
    "d81b60",
    "c2185b",
    "ad1457",
    "880e4f",
    "ff80ab",
    "ff4081",
    "f50057",
    "c51162",
    "f3e5f5",
    "e1bee7",
    "ce93d8",
    "ba68c8",
    "ab47bc",
    "9c27b0",
    "8e24aa",
    "7b1fa2",
    "6a1b9a",
    "4a148c",
    "ea80fc",
    "e040fb",
    "d500f9",
    "aa00ff",
    "ede7f6",
    "d1c4e9",
    "b39ddb",
    "9575cd",
    "7e57c2",
    "673ab7",
    "5e35b1",
    "512da8",
    "4527a0",
    "311b92",
    "b388ff",
    "7c4dff",
    "651fff",
    "6200ea",
    "e8eaf6",
    "c5cae9",
    "9fa8da",
    "7986cb",
    "5c6bc0",
    "3f51b5",
    "3949ab",
    "303f9f",
    "283593",
    "1a237e",
    "8c9eff",
    "536dfe",
    "3d5afe",
    "304ffe",
    "e3f2fd",
    "bbdefb",
    "90caf9",
    "64b5f6",
    "42a5f5",
    "2196f3",
    "1e88e5",
    "1976d2",
    "1565c0",
    "0d47a1",
    "82b1ff",
    "448aff",
    "2979ff",
    "2962ff",
    "e1f5fe",
    "b3e5fc",
    "81d4fa",
    "4fc3f7",
    "29b6f6",
    "03a9f4",
    "039be5",
    "0288d1",
    "0277bd",
    "01579b",
    "80d8ff",
    "40c4ff",
    "00b0ff",
    "0091ea",
    "e0f7fa",
    "b2ebf2",
    "80deea",
    "4dd0e1",
    "26c6da",
    "00bcd4",
    "00acc1",
    "0097a7",
    "00838f",
    "006064",
    "84ffff",
    "18ffff",
    "00e5ff",
    "00b8d4",
    "e0f2f1",
    "b2dfdb",
    "80cbc4",
    "4db6ac",
    "26a69a",
    "009688",
    "00897b",
    "00796b",
    "00695c",
    "004d40",
    "a7ffeb",
    "64ffda",
    "1de9b6",
    "00bfa5",
    "e8f5e9",
    "c8e6c9",
    "a5d6a7",
    "81c784",
    "66bb6a",
    "4caf50",
    "43a047",
    "388e3c",
    "2e7d32",
    "1b5e20",
    "b9f6ca",
    "69f0ae",
    "00e676",
    "00c853",
    "f1f8e9",
    "dcedc8",
    "c5e1a5",
    "aed581",
    "9ccc65",
    "8bc34a",
    "7cb342",
    "689f38",
    "558b2f",
    "33691e",
    "ccff90",
    "b2ff59",
    "76ff03",
    "64dd17",
    "f9fbe7",
    "f0f4c3",
    "e6ee9c",
    "dce775",
    "d4e157",
    "cddc39",
    "c0ca33",
    "afb42b",
    "9e9d24",
    "827717",
    "f4ff81",
    "eeff41",
    "c6ff00",
    "aeea00",
    "fffde7",
    "fff9c4",
    "fff59d",
    "fff176",
    "ffee58",
    "ffeb3b",
    "fdd835",
    "fbc02d",
    "f9a825",
    "f57f17",
    "ffff8d",
    "ffff00",
    "ffea00",
    "ffd600",
    "fff8e1",
    "ffecb3",
    "ffe082",
    "ffd54f",
    "ffca28",
    "ffc107",
    "ffb300",
    "ffa000",
    "ff8f00",
    "ff6f00",
    "ffe57f",
    "ffd740",
    "ffc400",
    "ffab00",
    "fff3e0",
    "ffe0b2",
    "ffcc80",
    "ffb74d",
    "ffa726",
    "ff9800",
    "fb8c00",
    "f57c00",
    "ef6c00",
    "e65100",
    "ffd180",
    "ffab40",
    "ff9100",
    "ff6d00",
    "fbe9e7",
    "ffccbc",
    "ffab91",
    "ff8a65",
    "ff7043",
    "ff5722",
    "f4511e",
    "e64a19",
    "d84315",
    "bf360c",
    "ff9e80",
    "ff6e40",
    "ff3d00",
    "dd2c00",
    "efebe9",
    "d7ccc8",
    "bcaaa4",
    "a1887f",
    "8d6e63",
    "795548",
    "6d4c41",
    "5d4037",
    "4e342e",
    "3e2723",
    "fafafa",
    "f5f5f5",
    "eeeeee",
    "e0e0e0",
    "bdbdbd",
    "9e9e9e",
    "757575",
    "616161",
    "424242",
    "212121",
    "eceff1",
    "cfd8dc",
    "b0bec5",
    "90a4ae",
    "78909c",
    "607d8b",
    "546e7a",
    "455a64",
    "37474f",
    "263238",
    "303030",
    "000000"]
}