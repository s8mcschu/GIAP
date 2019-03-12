ID_Character_775 = function () {

    var ELT = "",
        IN_TUTORIAL = false,
        TOTAL_TAGS = 0,
        OTHERS = [
            [0, 'verdani', '#607cae', 0],
            [0, 'neo23', '#607cae', 0],
            [0, 'legolas', '#607cae', 0],
            [0, 'anork85', '#607cae', 0]
        ],
        TOP10TAGS = [],
        TOP15TAGS = [],
        TOP20TAGS = [],
        TOP25TAGS = [],
        TOP40TAGS = [],
        TOP100TAGS = [],
        username = '',


        init = function (element) {
            ELT = element;
        },


        setView = function () {
            IN_TUTORIAL = false;
            setIDCharacter775View(false);
        },

        setTutorialView = function () {
            IN_TUTORIAL = true;
            setIDCharacter775View(true);
        },

        setEndView = function () {
            $.get('views/mst_id_character_775.html', function (template) {
                disableTagFieldAndNextButton();
                var params = {
                    end_screen: true
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
            });
        },

        setIDCharacter775View = function (in_tutorial) {
            if (in_tutorial) {
                TOP10TAGS = [{tag: 'unruhig'}, {tag: 'verlassen'}, {tag: 'düster'}, {tag: 'glücklich'}, {tag: 'ruhig'},
                    {tag: 'verträumt'}, {tag: 'dunkel'}, {tag: 'trist'}, {tag: 'warm'}];
            }
            $.get('views/mst_id_character_775.html', function (template) {
                var params = {
                    end_screen: false,
                    start_charac: TOTAL_TAGS < 25,
                    charac_1:  TOTAL_TAGS > 24 && TOTAL_TAGS < 50,
                    charac_2: TOTAL_TAGS > 49 && TOTAL_TAGS < 75,
                    charac_3: TOTAL_TAGS > 74 && TOTAL_TAGS < 100,
                    charac_4: TOTAL_TAGS > 99
                };
                var rendered = Mustache.render(template, params);
                $('#' + ELT).html(rendered);
                showLeaderboard();
                var next_btn = $('#next_img');
                next_btn.html('Bestätigen');
                next_btn.prop('onclick', null).off('click');
                next_btn.click(function () {
                    rateTags()
                });
            });

        },

        addNewTag = function () {
            TOTAL_TAGS++
            checkCharacter();
            updateLeaderboard();
        },

        removeNewTag = function () {
            TOTAL_TAGS--;
            updateLeaderboard();
        },

        storePoints = function () {
            setCookie('points_775', TOTAL_TAGS);
        },

        setPoints = function (pts) {
            TOTAL_TAGS = pts;
        },

    checkCharacter = function () {
        if (TOTAL_TAGS === 25) {
            $('#charac_image_775').src = "img/character_images/Stoff.png";
        }
        if (TOTAL_TAGS === 50) {
            $('#charac_image_775').src = "img/character_images/Leder.png";
        }
        if (TOTAL_TAGS === 75) {
            $('#charac_image_775').src = "img/character_images/ersterRitter.png";
        }
        if (TOTAL_TAGS === 100) {
            $('#charac_image_775').src = "img/character_images/Ritter.png";
        }
    },

        rateTags = function () {
            disableTagFieldAndNextButton();
            var next_img_btn = $('#next_img');
            next_img_btn.html('Bestätigt');
            var ownTags = $("#myTags").tagit('assignedTags');
            printLog("top10:" + TOP10TAGS);
            var rating = [];
            for (var i = 0; i < ownTags.length; i++) {
                if (compareTags(TOP10TAGS, ownTags[i])) {
                    rating[i] = "überragend";
                    continue;
                }
                if (compareTags(TOP15TAGS, ownTags[i])) {
                    rating[i] = "sehr gut";
                    continue;
                }
                if (compareTags(TOP20TAGS, ownTags[i])) {
                    rating[i] = "gut";
                    continue;
                }
                if (compareTags(TOP25TAGS, ownTags[i])) {
                    rating[i] = "in Ordnung";
                    continue;
                }
                if (compareTags(TOP40TAGS, ownTags[i])) {
                    rating[i] = "ok";
                    continue;
                }
                if (compareTags(TOP100TAGS, ownTags[i])) {
                    rating[i] = "ausbaufähig";
                } else {
                    rating[i] = "schlecht";
                }
            }
            var htmlString = "";
            for (var j = 0; j < ownTags.length; j++) {
                htmlString += "<p>" + ownTags[j] + ": <b>" + rating[j] + "</b></p>\n";
            }
            $('#ratingDiv').html('');
            $('#ratingDiv').html(htmlString);
            setVisible($('#next_img_character_775'));
            $('#next_img_character_775').prop('onclick', null).off('click');
            $('#next_img_character_775').click(function () {
                btn_oc_postImageTags();
            });
        },

        compareTags = function (tagList, tag) {
            for (var k = 0; k < tagList.length; k++) {
                if (tag === tagList[k]) {
                    return true;
                }
            }
            return false;
        },

        saveTags = function (tags, number) {
            switch (number) {
                case 10: {
                    tags.forEach(function (tagAndCount) {
                        TOP10TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                case 15: {
                    tags.forEach(function (tagAndCount) {
                        TOP15TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                case 20: {
                    tags.forEach(function (tagAndCount) {
                        TOP20TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                case 25: {
                    tags.forEach(function (tagAndCount) {
                        TOP25TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                case 40: {
                    tags.forEach(function (tagAndCount) {
                        TOP40TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                case 100: {
                    tags.forEach(function (tagAndCount) {
                        TOP100TAGS.push(tagAndCount.tag);
                    });
                    break;
                }
                default : {

                }
            }

        },

        checkArray = function (arr1, arr2) {
            for (var i = 0; i < arr2.length; i++) ;
            {
                if (arr1.containsElement(arr2[i])) {
                    arr2[i] = null;
                }
            }
        },


        showLeaderboard = function () {
            username = getCookie('lb_username');
            username = username === "" ? 'Du' : username;

            if (IN_TUTORIAL) {
                username = "Du (Bsp.)";
            }

            // Display the ranking
            setOtherPoints();
            var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
            leaderboard.push([TOTAL_TAGS, username, '#5b67f1', 1]);

            var lb = $('#div_it_id_character_775_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: false,
                sort: 'desc',
                height: 100,
                width: 270
            });
        },

        updateLeaderboard = function () {
            var leaderboard = [OTHERS[0], OTHERS[1], OTHERS[2], OTHERS[3]];
            leaderboard.push([TOTAL_TAGS, username, '#5b67f1', 1]);

            var lb = $('#div_it_id_character_775_lb');
            lb.html('');
            lb.jqBarGraph({
                data: leaderboard,
                animate: false,
                sort: 'desc',
                height: 100,
                width: 270
            });
        },

        setOtherPoints = function () {
            var pointsVerd,
                pointsNeo,
                pointsLego,
                pointsAnork;
            if (IN_TUTORIAL) {
                pointsVerd = 103;
                pointsNeo = 85;
                pointsLego = 52;
                pointsAnork = 3;
            } else {
                pointsVerd = getRandomNumber(90, 105);
                pointsNeo = getRandomNumber(60, 90);
                pointsLego = getRandomNumber(30, 60);
                pointsAnork = getRandomNumber(5, 30);
            }
            OTHERS = [
                [pointsVerd, 'verdani', '#607cae', 0],
                [pointsNeo, 'neo23', '#607cae', 0],
                [pointsLego, 'legolas', '#607cae', 0],
                [pointsAnork, 'anork85', '#607cae', 0]
            ];

        };

    /**
     * Return the 'public' methods
     */
    return {
        init: init,
        setView: setView,
        setEndView: setEndView,
        setTutorialView: setTutorialView,
        addNewTag: addNewTag,
        removeNewTag: removeNewTag,
        rateTags: rateTags,
        showLeaderboard: showLeaderboard,
        setOtherPoints: setOtherPoints,
        saveTags: saveTags,
        storePoints: storePoints,
        setPoints: setPoints
    };
};