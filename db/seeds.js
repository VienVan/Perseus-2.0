var mongoose = require('mongoose');
var uri = process.env.MONGOLAB_URI || "mongodb://localhost/Perseus"
mongoose.connect(uri);
var Location = require('../models/Location');

Location.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

var locations = [
    {
      name: "Yosemite National Park",
      loc: [-119.57, 37.74],
      description: "Yosemite National Park inspires awe and wonder at the forces that have created its dramatic landscapes. Besides the famous waterfalls and awe-inpsiring mountains, Yosemite is a great place to see the meteor showers around April or May."
    },
    {
      name: "Grandview Campground",
      loc: [-118.29, 37.17],
      description: "No fee, space first-come first served, usually space is available except on Holiday weekends.",
      url: "http://www.sonic.net/bristlecone/WhiteMts.html#Visiting & camping"
    },
    {
      name: "Marble Mountains",
      loc: [-123.22, 41.49],
      description: "Towards the south side of the Marble Mountains, the sky is very clear with excellent transparency. The best horizon to star gaze lies on the East and North.",
      url: "http://www.fs.usda.gov/detailfull/klamath/specialplaces/?cid=stelprdb5104740&width=full"
    },
    {
      name: "Los Padres National Forest",
      loc: [-119.75, 34.66],
      description: "Near Mt. Pinos, the Chula parking lot is the most consistenly good site for amateurs in Southern California. A paved lot makes setup near your car easy. An Adventure Pass is required on all parked vehicles in the Los Padres National Forest area, which includes Mt. Pinos. Passes can be obtained at most sporting goods stores, some markets, and all Ranger stations for $5.00 (one night pass) or $30 (annual pass).",
      url: "http://www.frazmtn.com/fmcoc/snowcond.html"
    },
    {
      name: "Lake Sonoma Federal Recreation Area",
      loc: [-123.05, 38.71],
      description: "No special restrictions.  No fees required, but call first to see if there are any staging area closures. The sky here is quite dark. Lone Rock Site is large, about 1,500' elevation, generally level, open packed gravel and dirt, enough room for up to 100 vehicles and scopes if organized. Horizon values somewhat variable depending on exact set up location.  Picnic area adjacent, trailhead, potable water faucet, and in summer portable restrooms.  Campground 1/2 mile to the south, lights from campground unobtrusive.  Campground group site can be reserved for large observing groups. Astrophotographers should set up far from road to avoid occasional headlights.  This site is frequently the far northern end of the San Francisco Bay fog belt, and the site may become foggy late on humid evenings.  Site is often subject to mid- and high-clouds in winter. Not usually windy in normal years.  A.C.E. Rangers here are extremely astronomy-friendly and accommodating",
      url: "http://www.spn.usace.army.mil/lakesonoma"
    },
    {
      name: "Conway Summit",
      loc: [-119.18, 38.08],
      description: "I have observed at dozens of sites in Mono County and in Inyo County to the south and the conditions are superb. I never knew the stars until I moved here!",
      url: "http://www.sierranevadageotourism.org/content/conway-summit/sie4E24BFB6C85522E1E"
    },
    {
      name: "Monitor Pass",
      loc: [-119.81, 38.78],
      description: "This is public land, so anyone can camp any time, so long as the road is open. This is an outstanding dark-sky site about 2-2.5 hours drive from Sacramento, California. The elevation (about 8,500 feet) and remote location are ideal for observing. Clouds to the north will turn the small light domes into a light-polluted north sky. The road is a couple of hundred yards away, and runs at right angles to the location.",
      url: "http://www.alpinecounty.com/markleeville.html"
    },
    {
      name: "Henry Willard Coe State Park",
      loc: [-121.60, 37.17],
      description: "Set up along the east edge of the area, with one's vehicle facing northeast.  Put your scope to the southeast of your truck, so that you are in the shadow.  This will block light from Morgan Hill, and also from possible passing vehicles.  After dark, traffic is sparse.",
      url: "http://www.parks.ca.gov/?page_id=561"
    },
    {
      name: "San Diego Astronomy Association",
      loc: [-116.33, 32.61],
      description: "Great 10-acre club-owned site with power, water, johns, concrete pads, pay phone.",
      url: "http://www.sdaa.org"
    },
    {
      name: "Walker Pass Campground",
      loc: [-121.68, 37.92],
      description: "General: This dark sky site is the best kept secret within 'reasonable' driving distance from Los Angeles. It takes a little over 2 hours to drive to the site from downtown Los Angeles. Since driving to Mt. Pinos takes almost 1 1/2 hours, the extra minutes are really worth it. There are no trees to block the horizons, and it is much warmer in the cooler months than Mt. Pinos. Some people might hesitate to visit a site so close to the deep desert, because of winds and the resulting dust, but I have never experienced windy conditions at this site, due to the peaks in between the desert and the site. Even if it is very windy in the desert, it will not be at the site. The elevation (5000 ft) gets the observer above a significant amount of the atmospheric dust and haze, but the temperature is never in the 'arctic' range.",
      url: "http://www.ca.blm.gov/bakersfield/walkerpasstrailhead.html"
    },
    {
      name: "Fremont Peak",
      loc: [-121.50, 36.76],
      description: "$3.00 Parking Fee. Fremont Peak is home for the 30-inch 'Challenger' telescope. The Observatory is at the 2,700-foot level.",
      url: "http://www.fpoa.net "
    },
    {
      name: "Twin Peaks",
      loc: [-122.44, 37.75],
      description: "The Twin Peaks are two small hills with an elevation of about 925 feet, located near the geographic center of San Francisco, California. Except for Mount Davidson, they are the highest points in the city.",
      url: "http://www.sftodo.com/twinpeakssanfrancisco.html"
    },
    {
      name: "Grizzly Peak",
      loc: [-122.25, 37.89],
      description: "“Even when the fog covers the flatlands, telling us the temperatures will be dropping, the view is lovely, just different.",
      url: "http://www.yelp.com/biz/grizzly-peak-berkeley-2"
    },
    {
      name: "Montebello Open Space Preserve",
      loc: [-122.61, 38.00],
      description: "This is a well known destination for Bay Area Telescope enthusiasts. It's at the top of Page Mill Road in Palo Alto. You can apply for a free permit to gain access to the parking lot after-hours.",
      url: "http://www.openspace.org/preserves/monte-bello"
    },
    {
      name: "Point Reyes Station",
      loc: [-122.80, 38.06],
      description: "Point Reyes is located approximately 30 miles (50 km) north of San Francisco on Highway 1 along the west coast of California (see Maps). Travelers may approach the park from the winding scenic Highway 1, either northbound or southbound. Visitors can also reach the park via Sir Francis Drake Boulevard or the Point Reyes/Petaluma Road.",
      url: "https://www.nps.gov/pore/planyourvisit/directions.htm"
    },
    {
      name: "Esalen Institute",
      loc: [-121.64, 36.12],
      description: "If you have a weekend to spare, come to Esalen for a relaxing retreat, gaze at the stars and find your soul.",
      url: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjIkKe6uvvLAhXK0hoKHaCOBVQQFggcMAA&url=http%3A%2F%2Fwww.esalen.org%2F&usg=AFQjCNEKDNgaAJMatyPlC4E6oc22-8jBGA&sig2=FXg8KSxVpdPi2kLIejawgA&bvm=bv.118817766,d.amc"
    },
    {
      name: "Lands End",
      loc: [-122.50, 37.78],
      description: "Great place closer to the city to star gaze. Put in the gps for Fort Miley and it'll take you to the closest parking lot."
    },
    {
      name: "Joshua Tree National Park",
      loc: [-115.91, 33.91],
      description: "Half of the park is at night. Great to hike in the day time, with numerous camping spots at night.",
      url: "https://www.nps.gov/jotr/index.htm"
    },
    {
      name: "Fort Griffin State Historic Site",
      loc: [-78.67, 33.82],
      description: " The skies are excellent, and often very dry. Situated on the edge of the 'Caprock' it can be windy at times, but usually calm by nightfall. Spring days can be stormy. Although Abilene is some 60 miles S-SW from the site, the skydome has little impact except on humid nights (<15 Degrees). To the East some 40 miles a retirement area surrounding a lake has started to grow and produce a similar light dome. Since the site is quite a bit higher than either Abilene or the lake area there is little protection from these sources. The West, North and overhead are impressive with exceptional sky quality on many nights. Users come from as far away as Houston to use this site. Often there will be 20 or more astronomers on a good night in the summer, winter use drops off even though the skies are clearer",
      url: "http://www.visitfortgriffin.com"
    },
    {
      name: "Big Bend National Park",
      loc: [-98.41, 30.58],
      description: "This site is an unbelievably dark shrine to the heavens.  Zodiacal light in March lasts 3 hours after twilight ends.  Even the Winter Milky Way is overwhelming.  Pleiades nebulosity and the California Nebula show up easily in binoculars.  M13 and M92 are direct-vision objects, and the desert air means much less extinction than would be expected near the horizons.  Omega Centauri is a visual overload and is easily resolvable if more than a few degrees above the horizon (it transits at 13 deg.) The sky simply has zero light pollution.",
      url: " http://www.nps.gov/bibe/planyourvisit/pgapvc.htm"
    },
    {
      name: "Davis Mountains State Park",
      loc: [-103.89, 30.58],
      description: "A small extra fee is required by Park Officials, in addition to the regular nominal entrance fee. Fort Davis is also home to the annual Texas Star Party",
      url: "http://www.tpwd.state.tx.us/spdest/findadest/parks/davis_mountains/"
    },
    {
      name: "Hubbard City Lakes",
      loc: [-94.32, 32.51],
      description: "For those who live in Dallas/Ft. Worth or Austin, this is a great site to travel to without being hours and hours away!  The light dome from Waco in the WEST reaches about a maximum 10 degrees during humid months.  DFW light dome shows to below Polaris in the North.  Due east, the dome reaches to no more than 10 degrees in humidity.  The South view is pristine!  I did a public star party at the HUBBARD CITY LAKES (LAKE NUMBER 4) to view COMET LINEAR after the turn of the century and saw it at 6.2 magnitude with the naked eye!",
      url: "http://www.centexasastronomy.org"
    },
    {
      name: "Copper Breaks State Park",
      loc: [-97.80, 33.29],
      description: "The husband & wife team of Park Rangers are both astronomers, and the Fort Worth Astronomical Society and the Dallas Texas Astronomical Society (TAS) both sponsor monthly 'Skywalk' star parties Spring through Fall. The park now has several instruments for use on site, including Obsession truss mounts, some giant binoculars and solar observing instruments. See the park calendar on the park's web site for dates. A new observing area is being planned at the upper end of the park, where the seeing is best. The star parties are usually well attended, and experienced observers are encouraged to help maneuver the large scopes for participants, who usually trail off by 10:30 to 11:00, when the serious observing begins. Many weekends I have been a lone, undisturbed observer under these beautiful skies.",
      url: "http://www.tpwd.state.tx.us/spdest/findadest/parks/copper_breaks/"
    },
    {
      name: "Caprock Canyons State Park",
      loc: [-101.05, 34.36],
      description: "The park is beautiful during the day and full of wildlife, including deer. There is plenty to do during the day: hiking, mountain biking, nature photography, bird watching, and horseback riding. At night, the Milky Way is so bright that it reflects off of the red canyon walls. After the coyotes go silent, the stillness is calming. The facilities are nice, and the best camp sites are those along the canyon ridge. See my Mountain Biking Texas web site for photos. Quitaque does not have an ATM machine. ",
      url: " http://www.tpwd.state.tx.us/spdest/findadest/parks/caprock_canyons"
    },
    {
      name: "Long Point State Park",
      loc: [-71.72, 46.68],
      description: "Although it is not as dark and at lower elevation than the Martz Observatory which is located about 35 minutes to the south in Frewsburg, Long Point State Park offers a much more convenient spot for stargazers who are staying on Chautauqua Lake.  No overnight camping is allowed, but there is no restriction on overnight use and stargazing is a recognized activity at the park.  Bathrooms are available at the marina parking lot and there are 7 miles of scenic hiking trails, a bathing beach and many picnic areas at the site too.  On high humidity nights the Jamestown metro area will put up a small light dome in the east, but it is mostly masked by nearby hills.",
      url: "http://nysparks.state.ny.us/cgi-bin/cgiwrap/nysparks/parks.cgi?p+4"
    },
    {
      name: "Martz Observatory",
      loc: [-79.03, 41.97],
      description: "The observatory is located 10 miles southeast of the Jamestown, NY metro area (pop. ~40,000) and 11 miles north-northeast of Warren, PA  (pop. ~10,000).  Although there are light domes from both cities, they are well masked and the skies remain very dark, especially in the northeast to south quadrant which looks into the Kinzua Reservoir area, which is made up of state and federal forest land.  The elevation of the Martz Observatory is 2060' above sea level.",
      url: "http://www.martzobservatory.org"
    },
    {
      name: "Sabatis Train Station",
      loc: [-73.86, 40.88],
      description: "Darker than dark, occasional auto traffic passing thru. We get a lot of clouds up here, but a trip up on a clear night and you would be hard pressed to find anything better east of the Mississippi. The train station is now demolished, but you can ask for permission to camp from authorities. Call Stephen Durham at 518 624 3860 for more information."
    },
    {
      name: "Greenwood Park",
      loc: [-76.00, 42.35],
      description: "This is a fine park for observing. You do have to be camped there in order to stay inside after they lock the gates at dusk. If you observe, count on the ranger coming by at some point to ask what you're doing. As long as you're camped and don't appear threatening, you should be okay. The campground and the lake area have some lights. To escape them, I go to a parking lot which serves a picnic area. Trees there block off all lights. Horizons are okay there. ",
      url: "http://www.gobroomecounty.com/community/ParksGreenwood.php"
    },
    {
      name: "Pine Mountain Observatory",
      loc: [-123.0951, 44.0505],
      description: "Pine Mountain Observatory, which is owned and operated by the University of Oregon, has 15-, 24-, and 32-inch telescopes.  The 15-inch is used for public viewing.  There is a free, albeit primitive campground nearby.  You will need to bring your own water.",
      url: "http://pmo-sun.uoregon.edu/~pmo/index.html"
    },
    {
      name: "Indian Trail Springs",
      loc: [-106.846394, 40.494679],
      description: "Very large alpine meadow site. The ground material is volcanic rock with an assortment of sage and wildflowers.  The site can have mosquitoes during the early spring and can be dusty also. The nights can be quite cold even in summer.  Not accessible in winter.",
      url: "http://www.teleport.com/~ospinc"
    },
    {
      name: "Table Mountain",
      loc: [-121.977527, 45.645218],
      description: " Nice open meadow site, with trees surrounding, which are nice for camping.  One small campground with pit toilet is available. High elevation means the site has mosquitoes some times of the year, and also can be quite chilly even in summer.  Not accessible in winter.",
      url: "http://www.tmspa.com"
    },
    {
      name: "Groundhog Mountain Park",
      loc: [-79.851849, 37.290029],
      description: "I had the opportunity to visit this site last weekend and was totally blown away by the skies!  I normally view to the Southeast of Greensboro in relatively dark skies at Three College Observatory, but the 2.5 hour drive up to Hogback Mtn. was well worth the effort.",
      url: "http://www.blueridgeparkway.info/groundhog_mountain.htm"
    },
    {
      name: "Powhatan Wildlife Management Area ",
      loc: [-77.924158, 37.553341],
      description: "The site is about 40 miles southwest of Richmond.   Head West on the Midlothian Turnpike (US 60) and cross the Powhatan County border. ",
      url: "http://www.dgif.virginia.gov/wmas/detail.asp?pid=18"
    },
    {
      name: " Staunton River State Park ",
      loc: [-78.673802, 36.69856],
      description: "Staunton River State Park is the location of the Staunton River Star Party, held once in the spring and once in the fall. The park, rangers and staff are very accommodating. If you are there to observing outside of the star party dates, contact the park staff and rangers for approval before setting up anything on the main field.",
      url: "http://www.dcr.virginia.gov/state_parks/sta.shtml"
    },
    {
      name: "Whitetop Mountain ",
      loc: [-81.570991, 36.620038],
      description: " Whitetop is about an hour drive from Doughton Park on the Blue Ridge Parkway in NC. At 5,500 feet it is considerably higher than Doughton which is at 3,300 feet and the seeing on clear nights is spectacular. The south and south east horizons are particularly dark. Omega Centauri is just visible naked eye and is totally overwhelming in my Takahashi Mewlon 250 or just about any 'scope for that matter: talk about stars and stars and more stars. Great location for astrophotography. Very cold in winter with any wind. Dress very warmly.",
      url: " http://www.rlrouse.com/whitetop-mountain.html"
    },
    {
      name: "Catahoula National Wildlife Refuge",
      loc: [-92.361038, 31.288308],
      description: "This is just a publicly-accessible area, completely devoid of any kind of development except the flood control gates.",
      url: "http://www.fws.gov/catahoula"
    },
    {
      name: "Meeting House Park",
      loc: [-70.238334, 43.850375],
      description: "Passing car lights will bother you if you stay near the road but it is not very busy. Sodium light on end of barn 1/2 mile away is bothersome. I am working with owner to change.",
      url: "http://www.northyarmouth.govoffice.com"
    },
    {
      name: "Natural Bridges National Monument",
      loc: [-109.464127, 37.641187],
      description: " Natural Bridges Park is the first 'official dark-sky site' in the US. The area is surrounded by hills and mountains high enough to block any outside light from any nearby towns. You don't need to be 'in the park, proper', because the surrounding hills blocking any light for miles, but the park site is safe and open to visitors. I stayed in Blanding (estimate 30 miles away to the east) and drove over. In fact, when I went back to the park center at 2am (once the moon set), I was alone, except for a small camper in the area.  The coke machine worked, and if I remember correctly, the bathrooms were accessible.",
      url: "http://www.nps.gov/nabr/naturescience/darkskypark.htm"
    },
    {
      name: "Pettigrew State Park",
      loc: [-76.436904, 35.832688],
      description: ". Months of November to April are best for 2 reasons: little haze and little activity on the lake (i.e., boaters). Rangers say that Spring, Summer, and early Fall weekends will probably have boaters at night (a very popular bass lake). If this is the case, the security light will be left on for safety reasons. However, a ranger told us that during the week there are usually no boaters. If no one is on the lake, the light can be turned off for you. A fantastic site for the serious deep sky observer.",
      url: "http://ils.unc.edu/parkproject/pett.html"
    },
    {
      name: "Bladen Lakes State Forest (BLSF)",
      loc: [-78.557053, 34.704929],
      description: "This site is a very dark site with only one small light dome from Elizabethtown and an extremely minor glow on the northwestern horizon from Fayetteville that is over 30 miles away. The actual site is a large clear cut area (45 acres I think) with good horizons. No traffic will be coming on these roads at all (I have never experienced traffic in the many times I have been there)",
      url: "http://www.mindspring.com/~pleiades7/darksky.html"
    },
    {
      name: "Doughton Park",
      loc: [-81.255522, 36.42902],
      description: " This is one of the best sites in the NC mountains.  Any new moon weekend will find telescopes ranging from 4.5 to 20+ taking advantage of the skies and usually 2 or more NC astronomy clubs will have members observing here .  Wind can be a problem some days for photography, but overall not a concern.  Humidity is low and relative sky glow is limited to the ENE.",
      url: "http://www.nps.gov/blri/doughton.htm"
    },
    {
      name: "Hooper's Bald Trailhead - Cherohala Skyway",
      loc: [-83.38541, 35.056005],
      description: "This site is situated along the Cherohala Skyway scenic by-way, which runs through the Nantahala National Forest between Robbinsville, NC and Telico Plains, TN.  Although the Skyway offers several scenic overlooks for partial views of the night sky, the Hooper Bald Trailhead parking lot (near the NC/TN boarder) is situated slightly above the roadway and is removed from the direct headlights of [rare] passing vehicles. Trees surrounding the parking lot block the lowest portions of the southern sky, but this high ridge is not blocked by any other nearby mountain tops. The site is a parking lot for about 20 cars and offers outhouse facilities. The site is also used by amateur radio operators.",
      url: "http://ilovenc.com/cherohala.htm"
    },
    {
      name: "Haleakala National Park Summit Visitor Center",
      loc: [-156.311816, 20.842641],
      description: "This is one of the best observing sites on Earth! Nearby Mauna Kea on the Big Island of Hawaii is better, but of course, that is generally considered THE top site in the world. Note: Come prepared for harsh summit conditions. You won't 'survive' more than a few minutes at night with your beach shorts and T-shirt. Temperatures drop fast after sundown, usually into the low 40's, and the winds can blow mercilessly, easily up to 40+ mph, creating serious wind-chills. Locating a 'wind shadow' behind any structure, ridge or tall vehicle, is HIGHLY recommended.",
      url: "http://www.nps.gov/hale/"
    },
    {
      name: "Dillingham",
      loc: [-157.827698, 21.27693],
      description: "This is probably the best site you will find on Oahu. The site is about as far from town as you can get and is one of the main observing sites of the HAS. The club holds monthly star parties on the Saturday night nearest New Moon, 'Last Quarter Moon' star parties on the preceding Saturdays, and special events.",
      url: "http://www.hawastsoc.org"
    },
    {
      name: "Chiricahua National Monument",
      loc: [-109.389795, 32.006796],
      description: " This is a high altitude site (well, moderate) and gets cool, so dress warmly. Wind is often a problem, but there are many places to tuck behind trees and hills in the two parking areas. Other observers are occasionally present.",
      url: "http://www.nps.gov/chir"
    },
    {
      name: "Golden Gate Canyon State Park",
      loc: [-105.338331, 39.841836],
      description: "I lived and operated an observatory on the northeast corner of this park for 25 years. The Rimrock campground is at an elevation of 9,000 feet ASL, so the sky can be very transparent. Temperatures at night are always cool to cold with temperatures in the 40s F in mid-summer.",
      url: "http://parks.state.co.us/Parks/GoldenGateCanyon/"
    },
    {
      name: "Cedar Key Airport",
      loc: [-83.036, 29.1377],
      description: "When we went to Cedar Key because my wife and daughter wanted to be on the water, little did I realize we were also stumbling across one of the most laid back, nifty observing spots in Florida.  We'll be going back again!",
      url: "http://cedarkey.org"
    },
    {
      name: "Withlacoochee River Park",
      loc: [-82.123907, 28.339569],
      description: "Withlacoochee River Park is used by the St. Petersburg Astronomy Club for our dark sky site. We are there on most New Moon Weekends and host our annual star party, the Orange Blossom Special, each year. Visitors are welcome at our monthly viewings, but must preregister for the annual star party.",
      url: "http://www.swfwmd.state.fl.us/recreation/areas/withlacoocheeriverpark.html"
    },
    {
      name: "South Florida Everglades",
      loc: [-80.349597, 26.13842],
      description: "This is the dark site of the South Florida Amateur Astronomers Astronomers. Weather permitting , we use this site on or near New Moon every month of the year. Since this site is not easy to find we ask those who are interested in using the site to contact the observatory at (954) 384-0442 and leave a message for the Director or contact us through email via our web site: http://www.sfaaa.org.  We will arrange to have you follow someone to the site.",
      url: "http://www.sfaaa.org"
    },
    {
      name: "Goldhead Branch State Park",
      loc: [-81.9594, 29.7363],
      description: "There are a number of places to set up your scope within the park, offering different horizon conditions.  The comments above relate to what I feel is the best observing area, located near a large lake on the southeast section of the park (near some cabins).  Given the presence of overnight campers, you might have a chance of some non-astronomical neighbors, including the park rangers, stopping by during your earlier hours, car lights ablaze.  So if you engage in astrophotography, best to do it during the latter hours.  The park is patrolled, and very secure.",
      url: "http://www.funandsun.com/parks/GoldHead/goldhead.html"
    },
    {
      name: "County Road 80A (Cowgirl Way)",
      loc: [-81.418992, 26.767028],
      description: " Contributor writes that there is 'only one resident in the area, and they are astronomer friendly.'",
      url: "http://www.google.com"
    },
    {
      name: "Kissimmee River Lock",
      loc: [-81.20854, 27.390263],
      description: "It's safe, easy to find, and attended 24 hours a day.  Predators in the area are a minor concern, just some alligators in the water (if you stay away from the water they will stay away from you), raccoons near the garbage cans and mosquitos (bring LOTS of bug spray).",
      url: " https://www.google.com/maps/@27.3986836,-81.1175493,14z"
    },
    {
      name: "Fr 276",
      loc: [-82.27626, 30.459798],
      description: "This is the dark-sky site for the Northeast Florida Astronomical Society. The club holds observing sessions there twice a month around the New Moon. The site can be hard to find, so look at the maps and contact info at the club's web site.",
      url: "http://www.nefas.org"
    },
    {
      name: "Lower Suwannee Federal National Wildlife Refuge",
      loc: [-76.800974, 42.910084],
      description: "The site is accessible 24/7 with no fee. No open fires or alcohol.  Also, perhaps of only geek interest, this site is also a Geocache. This link will take you to the cache.",
      url: "http://lowersuwannee.fws.gov/index.html"
    }
];

Location.create(locations, function(err, doc) {
    if (err){ console.log("ERROR:", err); }
    else {
      console.log("Created: " , doc);
      mongoose.connection.close();
    }
  });
