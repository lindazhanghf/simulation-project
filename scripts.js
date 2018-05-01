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
          "text":"",
          "image_path":"assets/school_homework.jpg",
          "button_text":"Do homework",
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
          "text":"",
          "image_path":"assets/school_chat.jpg",
          "button_text":"Chat with classmates",
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
          // "image_path":"assets/school_homework.jpg",
          "button_text":"Do homework",
          "tooltip" : {
            "grade" : 2,
            "parent" : 2
          },
          "affect" : {
            "grade" : 4,
            "parent" : 8
          },
          "result" : "It was not easy but you eventually pulled it through.<br/><br/>"
        },
        "opt2" : {
          "text":"",
          // "image_path":"assets/school_chat.jpg",
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
          // "image_path":"assets/school_chat.jpg",
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
]