var game = [
	{
		"name" : "breakfast",
	  "scripts" : [`It's a new day! You are stressed out from homework yesterday night. <br/><br/>What should you do?`],
	  "options" : [
	    {
	      "id":"opt_early",
	      "text":"Participate in the Morning Reading",
	      "image_path":"assets/morning_reading.jpg",
	      "button_text":"Go to school early",
	      "tooltip" : {
	      	"grade" : 2,
	      	"parent" : 2
	      }
	    },
	    {
	      "id":"opt_late",
	      "text":"Skip the Morning Reading",
	      "image_path":"assets/sleep.jpg",
	      "button_text":"Sleep for longer"
	    }
	  ]
	}
]