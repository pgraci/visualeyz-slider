# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

bugs = Slider.create(name: 'Bug Bunny')
wile = Slider.create(name: 'Wile E. Coyote')
sam  = Slider.create(name: 'Yosemite Sam')

bugs.slides.create(title: "What's up with Docs?")
bugs.slides.create(title: "Of course, you know, this means war.")

wile.slides.create(title: "Getting the most from the Acme categlog.")

sam.slides.create(title: "Shaaaad up!")
sam.slides.create(title: "Ah hates rabbits.")
sam.slides.create(title: "The Great horni-todes")
