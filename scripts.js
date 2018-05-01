var game = [
    {
      "name" : "breakfast",
      "scripts" : [`It's a new day! You are stressed out from homework yesterday night. <br/><br/>What should you do?`],
      "options" : {
        "opt_early" : {
          "text":"Participate in the Morning Reading",
          "image_path":"assets/morning_reading.jpg",
          "button_text":"Go to school early",
          "tooltip" : {
            "grade" : 1,
            "parent" : 2
          },
          "affect" : {
            "grade" : 1,
            "parent" : 5
          },
          "result" : "You reviewed some important knowledge during the Morning Reading session. A good start for the day!<br/><br/> "
        },
        "opt_late" : {
          "text":"Skip the Morning Reading",
          "image_path":"assets/sleep.jpg",
          "button_text":"Sleep for longer",
          "tooltip" : {
            "parent" : -1
          },
          "affect" : {
            "parent" : -3
          },
          "result" : "You slept for a few extra minutes, but your parents were not super happy about this. <br/><br/> "
        }
      }
    },
    {
      "name" : "school",
      "scripts" : [`School had started! What should you do between classes?`],
      "options" : {
        "opt1" : {
          "text":"Make the best use of your time in school",
          "image_path":"assets/school_homework.jpg",
          "button_text":"Study hard",
          "tooltip" : {
            "grade" : 2,
            "parent" : 2,
            "social" : -2,
          },
          "affect" : {
            "grade" : 4,
            "parent" : 8,
            "social" : -10,
          },
          "result" : "It was not easy but you eventually pulled it through.<br/><br/>"
        },
        "opt2" : {
          "text":"Chat with your classmates",
          "image_path":"assets/school_chat.jpg",
          "button_text":"Take it easy",
          "tooltip" : {
            "social" : 2
            // "grade" : -1,
            // "parent" : -2
          },
          "affect" : {
            "social" : 8
            // "grade" : -2,
            // "parent" : -4
          },
          "result" : "You had a great time with your classmates!<br/><br/>"
        }
      }
    },
    {
      "name" : "after school",
      "scripts" : [`Now it's the end of school. What do you want to do before going home?`],
      "options" : {
        "opt1" : {
          "text":"",
          "image_path":"assets/after_homework.jpg",
          "button_text":"Do homework",
          "tooltip" : {
            "grade" : 2,
            "parent" : 2
          },
          "affect" : {
            "grade" : 3,
            "parent" : 8
          },
          "result" : "It's good to catch up with some homework while teachers are still around.<br/><br/>"
        },
        "opt2" : {
          "text":"",
          "image_path":"assets/after_club_academic.jpg",
          "button_text":"Participate in academic clubs",
          "tooltip" : {
            "grade" : 1,
            "parent" : 1,
            "social" : 1,
          },
          "affect" : {
            "grade" : 1,
            "parent" : 3,
            "social" : 3,
          },
          "result" : "You learned something new and made a few friends!<br/><br/>"
        },
        "opt3" : {
          "require" : 50,
          "text":"",
          "image_path":"assets/after_club_fun.jpg",
          "button_text":"Participate in fun clubs!",
          "tooltip" : {
            "social" : 3,
            // "grade" : 1,
            // "parent" : 1
          },
          "affect" : {
            "social" : 15,
            // "grade" : -2,
            // "parent" : -4
          },
          "result" : "You enjoyed your time in the school clubs!<br/><br/>"
        }
      }
    },
    {
      "name" : "evening",
      "scripts" : [`You got home pretty late and you are tired. Whats your plan for the evening?`],
      "options" : {
        "opt1" : {
          "text":"Steady improvement",
          "image_path":"assets/homework.jpg",
          "button_text":"Do homework",
          "tooltip" : {
            "grade" : 2,
            "parent" : 2
          },
          "affect" : {
            "grade" : 5,
            "parent" : 8
          },
          "result" : "You have finished all the homework assigned by your teachers.<br/><br/>"
        },
        "opt2" : {
          "text":"It could boost your grade<br/>if your parents picked the right one",
          "image_path":"assets/home_additional.jpg",
          "button_text":"Work on additional exercises",
          "tooltip" : {
            "grade" : 0,
            "parent" : 3,
          },
          "affect" : {
            "grade" : 5,
            "parent" : 15,
          },
          "result" : ""
        },
        "opt3" : {
          "require" : 80,
          "text":"Great conversation topic with peers",
          "image_path":"assets/home_tv.jpg",
          "button_text":"Watch TV",
          "tooltip" : {
            "social" : 2,
            // "grade" : 1,
            "parent" : -2
          },
          "affect" : {
            "social" : 8,
            // "grade" : -2,
            "parent" : -6
          },
          "result" : "Now you can catch up with your classmates on the latest Game of Throne series!<br/><br/>"
        }
      }
    },
    {
      "name" : "weekend",
      "scripts" : [`You made it through the week!!<br/><br/>What are you plans for the weekend?`],
      "options" : {
        "opt1" : {
          "text":"Stressful but worthwhile",
          "image_path":"assets/weekend_tutor.jpg",
          "button_text":"Go to tutor/classes",
          "tooltip" : {
            "grade" : 2,
            "parent" : 3
          },
          "affect" : {
            "grade" : 6,
            "parent" : 12
          },
          "result" : "It's a new week again! You are stressed out from classes yesterday.<br/><br/>"
        },
        "opt2" : {
          "text":"Not very effecient but you get to social",
          "image_path":"assets/weekend_study_friends.jpg",
          "button_text":"Study with friends",
          "tooltip" : {
            "grade" : 1,
            "social" : 2,
          },
          "affect" : {
            "grade" : 5,
            "social" : 8,
          },
          "result" : "It's a new week again! You are tired because of staying up late to finish homework, as you were busy chatting with your friends.<br/><br/>"
        },
        "opt3" : {
          "require" : 60,
          "text":"Shopping, karaoke, ComicCon...",
          "image_path":"assets/weekend_friends.jpg",
          "button_text":"Hang out with friends",
          "tooltip" : {
            // "grade" : 1,
            "parent" : -1,
            "social" : 3,
          },
          "affect" : {
            // "grade" : -2,
            "parent" : -3,
            "social" : 15,
          },
          "result" : "You had a great time with your friends.<br/><br/>"
        }
      }
    },
]