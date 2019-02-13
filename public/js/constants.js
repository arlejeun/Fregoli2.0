
var countryCodes =  [
    {value: "213", text: "Algeria (+213)"},
    {value: "376", text: "Andorra (+376)"},
    {value: "244", text: "Angola (+244)"},
    {value: "1264", text: "Anguilla (+1264)"},
    {value: "1268", text: "Antigua &amp; Barbuda (+1268)"},
    {value: "54", text: "Argentina (+54)"},
    {value: "374", text: "Armenia (+374)"},
    {value: "297", text: "Aruba (+297)"},
    {value: "61", text: "Australia (+61)"},
    {value: "43", text: "Austria (+43)"},
    {value: "994", text: "Azerbaijan (+994)"},
    {value: "1242", text: "Bahamas (+1242)"},
    {value: "973", text: "Bahrain (+973)"},
    {value: "880", text: "Bangladesh (+880)"},
    {value: "1246", text: "Barbados (+1246)"},
    {value: "375", text: "Belarus (+375)"},
    {value: "32", text: "Belgium (+32)"},
    {value: "501", text: "Belize (+501)"},
    {value: "229", text: "Benin (+229)"},
    {value: "1441", text: "Bermuda (+1441)"},
    {value: "975", text: "Bhutan (+975)"},
    {value: "591", text: "Bolivia (+591)"},
    {value: "387", text: "Bosnia Herzegovina (+387)"},
    {value: "267", text: "Botswana (+267)"},
    {value: "55", text: "Brazil (+55)"},
    {value: "673", text: "Brunei (+673)"},
    {value: "359", text: "Bulgaria (+359)"},
    {value: "226", text: "Burkina Faso (+226)"},
    {value: "257", text: "Burundi (+257)"},
    {value: "855", text: "Cambodia (+855)"},
    {value: "237", text: "Cameroon (+237)"},
    {value: "1", text: "Canada (+1)"},
    {value: "238", text: "Cape Verde Islands (+238)"},
    {value: "1345", text: "Cayman Islands (+1345)"},
    {value: "236", text: "Central African Republic (+236)"},
    {value: "56", text: "Chile (+56)"},
    {value: "86", text: "China (+86)"},
    {value: "57", text: "Colombia (+57)"},
    {value: "269", text: "Comoros (+269)"},
    {value: "242", text: "Congo (+242)"},
    {value: "682", text: "Cook Islands (+682)"},
    {value: "506", text: "Costa Rica (+506)"},
    {value: "385", text: "Croatia (+385)"},
    {value: "53", text: "Cuba (+53)"},
    {value: "90392", text: "Cyprus North (+90392)"},
    {value: "357", text: "Cyprus South (+357)"},
    {value: "42", text: "Czech Republic (+42)"},
    {value: "45", text: "Denmark (+45)"},
    {value: "253", text: "Djibouti (+253)"},
    {value: "1809", text: "Dominica (+1809)"},
    {value: "1809", text: "Dominican Republic (+1809)"},
    {value: "593", text: "Ecuador (+593)"},
    {value: "20", text: "Egypt (+20)"},
    {value: "503", text: "El Salvador (+503)"},
    {value: "240", text: "Equatorial Guinea (+240)"},
    {value: "291", text: "Eritrea (+291)"},
    {value: "372", text: "Estonia (+372)"},
    {value: "251", text: "Ethiopia (+251)"},
    {value: "500", text: "Falkland Islands (+500)"},
    {value: "298", text: "Faroe Islands (+298)"},
    {value: "679", text: "Fiji (+679)"},
    {value: "358", text: "Finland (+358)"},
    {value: "33", text: "France (+33)"},
    {value: "594", text: "French Guiana (+594)"},
    {value: "689", text: "French Polynesia (+689)"},
    {value: "241", text: "Gabon (+241)"},
    {value: "220", text: "Gambia (+220)"},
    {value: "7880", text: "Georgia (+7880)"},
    {value: "49", text: "Germany (+49)"},
    {value: "233", text: "Ghana (+233)"},
    {value: "350", text: "Gibraltar (+350)"},
    {value: "30", text: "Greece (+30)"},
    {value: "299", text: "Greenland (+299)"},
    {value: "1473", text: "Grenada (+1473)"},
    {value: "590", text: "Guadeloupe (+590)"},
    {value: "671", text: "Guam (+671)"},
    {value: "502", text: "Guatemala (+502)"},
    {value: "224", text: "Guinea (+224)"},
    {value: "245", text: "Guinea - Bissau (+245)"},
    {value: "592", text: "Guyana (+592)"},
    {value: "509", text: "Haiti (+509)"},
    {value: "504", text: "Honduras (+504)"},
    {value: "852", text: "Hong Kong (+852)"},
    {value: "36", text: "Hungary (+36)"},
    {value: "354", text: "Iceland (+354)"},
    {value: "91", text: "India (+91)"},
    {value: "62", text: "Indonesia (+62)"},
    {value: "98", text: "Iran (+98)"},
    {value: "964", text: "Iraq (+964)"},
    {value: "353", text: "Ireland (+353)"},
    {value: "972", text: "Israel (+972)"},
    {value: "39", text: "Italy (+39)"},
    {value: "1876", text: "Jamaica (+1876)"},
    {value: "81", text: "Japan (+81)"},
    {value: "962", text: "Jordan (+962)"},
    {value: "7", text: "Kazakhstan (+7)"},
    {value: "254", text: "Kenya (+254)"},
    {value: "686", text: "Kiribati (+686)"},
    {value: "850", text: "Korea North (+850)"},
    {value: "82", text: "Korea South (+82)"},
    {value: "965", text: "Kuwait (+965)"},
    {value: "996", text: "Kyrgyzstan (+996)"},
    {value: "856", text: "Laos (+856)"},
    {value: "371", text: "Latvia (+371)"},
    {value: "961", text: "Lebanon (+961)"},
    {value: "266", text: "Lesotho (+266)"},
    {value: "231", text: "Liberia (+231)"},
    {value: "218", text: "Libya (+218)"},
    {value: "417", text: "Liechtenstein (+417)"},
    {value: "370", text: "Lithuania (+370)"},
    {value: "352", text: "Luxembourg (+352)"},
    {value: "853", text: "Macao (+853)"},
    {value: "389", text: "Macedonia (+389)"},
    {value: "261", text: "Madagascar (+261)"},
    {value: "265", text: "Malawi (+265)"},
    {value: "60", text: "Malaysia (+60)"},
    {value: "960", text: "Maldives (+960)"},
    {value: "223", text: "Mali (+223)"},
    {value: "356", text: "Malta (+356)"},
    {value: "692", text: "Marshall Islands (+692)"},
    {value: "596", text: "Martinique (+596)"},
    {value: "222", text: "Mauritania (+222)"},
    {value: "269", text: "Mayotte (+269)"},
    {value: "52", text: "Mexico (+52)"},
    {value: "691", text: "Micronesia (+691)"},
    {value: "373", text: "Moldova (+373)"},
    {value: "377", text: "Monaco (+377)"},
    {value: "976", text: "Mongolia (+976)"},
    {value: "1664", text: "Montserrat (+1664)"},
    {value: "212", text: "Morocco (+212)"},
    {value: "258", text: "Mozambique (+258)"},
    {value: "95", text: "Myanmar (+95)"},
    {value: "264", text: "Namibia (+264)"},
    {value: "674", text: "Nauru (+674)"},
    {value: "977", text: "Nepal (+977)"},
    {value: "31", text: "Netherlands (+31)"},
    {value: "687", text: "New Caledonia (+687)"},
    {value: "64", text: "New Zealand (+64)"},
    {value: "505", text: "Nicaragua (+505)"},
    {value: "227", text: "Niger (+227)"},
    {value: "234", text: "Nigeria (+234)"},
    {value: "683", text: "Niue (+683)"},
    {value: "672", text: "Norfolk Islands (+672)"},
    {value: "670", text: "Northern Marianas (+670)"},
    {value: "47", text: "Norway (+47)"},
    {value: "968", text: "Oman (+968)"},
    {value: "680", text: "Palau (+680)"},
    {value: "507", text: "Panama (+507)"},
    {value: "675", text: "Papua New Guinea (+675)"},
    {value: "595", text: "Paraguay (+595)"},
    {value: "51", text: "Peru (+51)"},
    {value: "63", text: "Philippines (+63)"},
    {value: "48", text: "Poland (+48)"},
    {value: "351", text: "Portugal (+351)"},
    {value: "1787", text: "Puerto Rico (+1787)"},
    {value: "974", text: "Qatar (+974)"},
    {value: "262", text: "Reunion (+262)"},
    {value: "40", text: "Romania (+40)"},
    {value: "7", text: "Russia (+7)"},
    {value: "250", text: "Rwanda (+250)"},
    {value: "378", text: "San Marino (+378)"},
    {value: "239", text: "Sao Tome &amp; Principe (+239)"},
    {value: "966", text: "Saudi Arabia (+966)"},
    {value: "221", text: "Senegal (+221)"},
    {value: "381", text: "Serbia (+381)"},
    {value: "248", text: "Seychelles (+248)"},
    {value: "232", text: "Sierra Leone (+232)"},
    {value: "65", text: "Singapore (+65)"},
    {value: "421", text: "Slovak Republic (+421)"},
    {value: "386", text: "Slovenia (+386)"},
    {value: "677", text: "Solomon Islands (+677)"},
    {value: "252", text: "Somalia (+252)"},
    {value: "27", text: "South Africa (+27)"},
    {value: "34", text: "Spain (+34)"},
    {value: "94", text: "Sri Lanka (+94)"},
    {value: "290", text: "St. Helena (+290)"},
    {value: "1869", text: "St. Kitts (+1869)"},
    {value: "1758", text: "St. Lucia (+1758)"},
    {value: "249", text: "Sudan (+249)"},
    {value: "597", text: "Suriname (+597)"},
    {value: "268", text: "Swaziland (+268)"},
    {value: "46", text: "Sweden (+46)"},
    {value: "41", text: "Switzerland (+41)"},
    {value: "963", text: "Syria (+963)"},
    {value: "886", text: "Taiwan (+886)"},
    {value: "7", text: "Tajikstan (+7)"},
    {value: "66", text: "Thailand (+66)"},
    {value: "228", text: "Togo (+228)"},
    {value: "676", text: "Tonga (+676)"},
    {value: "1868", text: "Trinidad &amp; Tobago (+1868)"},
    {value: "216", text: "Tunisia (+216)"},
    {value: "90", text: "Turkey (+90)"},
    {value: "7", text: "Turkmenistan (+7)"},
    {value: "993", text: "Turkmenistan (+993)"},
    {value: "1649", text: "Turks &amp; Caicos Islands (+1649)"},
    {value: "688", text: "Tuvalu (+688)"},
    {value: "256", text: "Uganda (+256)"},
    {value: "44", text: "UK (+44)"},
    {value: "380", text: "Ukraine (+380)"},
    {value: "971", text: "United Arab Emirates (+971)"},
    {value: "598", text: "Uruguay (+598)"},
    {value: "1", text: "USA (+1)"},
    {value: "7", text: "Uzbekistan (+7)"},
    {value: "678", text: "Vanuatu (+678)"},
    {value: "379", text: "Vatican City (+379)"},
    {value: "58", text: "Venezuela (+58)"},
    {value: "84", text: "Vietnam (+84)"},
    {value: "84", text: "Virgin Islands - British (+1284)"},
    {value: "84", text: "Virgin Islands - US (+1340)"},
    {value: "681", text: "Wallis &amp; Futuna (+681)"},
    {value: "969", text: "Yemen (North)(+969)"},
    {value: "967", text: "Yemen (South)(+967)"},
    {value: "260", text: "Zambia (+260)"},
    {value: "263", text: "Zimbabwe (+263)"}
];


