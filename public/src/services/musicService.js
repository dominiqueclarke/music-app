export default function($http) {

  const JamBaseTestData = {"data":{"Info":{"TotalResults":543,"PageNumber":0,"Message":null},"Events":[{"Id":2849427,"Date":"2016-10-01T16:00:00","Venue":{"Id":149573,"Name":"The Bomb Factory ","Address":"2713 Canton St","City":"Dallas","State":"Texas",

  "StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75226","Url":"","Latitude":0,"Longitude":0},"Artists":[{"Id":117133,"Name":"Blue, The Misfit"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1322091/tfly?utm_medium=api"},{"Id":2836511,"Date":"2016-10-01T19:00:00",
  "Venue":{"Id":130001,"Name":"The Foundry","Address":"2303 Pittman St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75208","Url":"","Latitude":32.7727611,"Longitude":-96.8312865},
  "Artists":[{"Id":87409,"Name":"My Jerusalem"},{"Id":111560,"Name":"Eliot Sumner"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1294827/tfly?utm_medium=api"},{"Id":2852928,"Date":"2016-10-01T19:00:00","Venue":{"Id":2999,"Name":"Club DaDa","Address":"2720 Elm Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75226","Url":"http://www.clubdada.com/","Latitude":32.784212,"Longitude":-96.78474},"Artists":[{"Id":89633,"Name":"Leagues"}],"TicketUrl":"http://do214.com/events/2016/10/1/last-band-standing-finale"},{"Id":2828586,"Date":"2016-10-01T20:00:00","Venue":{"Id":1486,"Name":"Trees","Address":"2709 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75201","Url":"http://treesdallas.com","Latitude":32.78283,"Longitude":-96.792579},"Artists":[{"Id":96331,"Name":"St. Lucia"},{"Id":113119,"Name":"Sofi Tukker"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1255241/tfly?utm_medium=api"},{"Id":2814227,"Date":"2016-10-01T20:00:00","Venue":{"Id":141067,"Name":"Gas Monkey Bar n' Grill","Address":"10261 Technology Blvd E","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75220","Url":"","Latitude":0,"Longitude":0},"Artists":[{"Id":40759,"Name":"Cute Is What We Aim For"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1252441/tfly?utm_medium=api"},{"Id":2841076,"Date":"2016-10-01T21:00:00","Venue":{"Id":135831,"Name":"Three Links Event Center","Address":"2704 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75303","Url":"","Latitude":32.7844141,"Longitude":-96.7844972},"Artists":[{"Id":78604,"Name":"White Mystery"}],"TicketUrl":"http://www.prekindle.com/promo/id/24545708306610502"},{"Id":2803954,"Date":"2016-10-01T21:00:00","Venue":{"Id":154089,"Name":"RBC","Address":"2617 Commerce St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75226","Url":"","Latitude":0,"Longitude":0},"Artists":[{"Id":26867,"Name":"Tourist"},{"Id":114138,"Name":"Left/Right"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1220591/tfly?utm_medium=api"},{"Id":2821559,"Date":"2016-10-01T21:00:00","Venue":{"Id":17355,"Name":"Granada Theater","Address":"3524 Greenville Ave","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75206","Url":"http://www.granadatheater.com","Latitude":32.830578,"Longitude":-96.770179},"Artists":[{"Id":96566,"Name":"Andy Timmons"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1266261/tfly?utm_medium=api"},{"Id":2814550,"Date":"2016-10-01T21:00:00","Venue":{"Id":30011,"Name":"South Side Ballroom","Address":"1135 South Lamar","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75215","Url":"http://www.southsidemusichall.com","Latitude":32.7696,"Longitude":-96.7984},"Artists":[{"Id":95802,"Name":"Flume"},{"Id":105277,"Name":"Wave Racer"},{"Id":116572,"Name":"Charles Murdoch"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fconcerts.livenation.com%2Fevent%2F0C0050DEBD1127BB"},{"Id":2814188,"Date":"2016-10-01T21:00:00","Venue":{"Id":62654,"Name":"House Of Blues","Address":"2200 N. Lamar Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.houseofblues.com/dallas/","Latitude":32.7843,"Longitude":-96.8081},"Artists":[{"Id":79107,"Name":"Die Antwoord"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3a%2f%2fwww.ticketmaster.com%2fpartner_redirect%3furl%3dhttp%3a%2f%2fconcerts.livenation.com%2fevent%2f0C0050EA2ECF4BA5"},{"Id":2825632,"Date":"2016-10-01T22:30:00","Venue":{"Id":134961,"Name":"Sundown at Granada","Address":"3520 Greenville Ave.","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75206","Url":"","Latitude":32.830579,"Longitude":-96.769815},"Artists":[{"Id":95068,"Name":"Bum Lucky"},{"Id":96058,"Name":"El Dub"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1277513/tfly?utm_medium=api"},{"Id":2825990,"Date":"2016-10-02T00:00:00","Venue":{"Id":30011,"Name":"South Side Ballroom","Address":"1135 South Lamar","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75215","Url":"http://www.southsidemusichall.com","Latitude":32.7696,"Longitude":-96.7984},"Artists":[{"Id":17363,"Name":"Los Lonely Boys"}],"TicketUrl":""},{"Id":2853808,"Date":"2016-10-02T00:00:00","Venue":{"Id":85861,"Name":"Village Country Club ","Address":"8308 Southwestern Blvd","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75206","Url":"http://www.thevillageapts.com/club/index.shtml","Latitude":32.860062,"Longitude":-96.764812},"Artists":[{"Id":58895,"Name":"Dallas Jazz Orchestra"}],"TicketUrl":""},{"Id":2726350,"Date":"2016-10-02T00:00:00","Venue":{"Id":14033,"Name":"American Airlines Center","Address":"2500 Victory Avenue","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75219","Url":"http://www.americanairlinescenter.com/","Latitude":33.046444,"Longitude":-97.089741},"Artists":[{"Id":45922,"Name":"Mana"}],"TicketUrl":""},{"Id":2825341,"Date":"2016-10-02T19:00:00","Venue":{"Id":2999,"Name":"Club DaDa","Address":"2720 Elm Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75226","Url":"http://www.clubdada.com/","Latitude":32.784212,"Longitude":-96.78474},"Artists":[{"Id":95741,"Name":"Ex-Cult"},{"Id":118003,"Name":"Power"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1258133/tfly?utm_medium=api"},{"Id":2847032,"Date":"2016-10-02T19:00:00","Venue":{"Id":72474,"Name":"The Prophet Bar","Address":"2548 Elm Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75226","Url":"http://www.theprophetbar.com","Latitude":32.783808,"Longitude":-96.787915},"Artists":[{"Id":108103,"Name":"Step Rockets"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1317821/tfly?utm_medium=api"},{"Id":2831040,"Date":"2016-10-02T19:00:00","Venue":{"Id":40382,"Name":"Opening Bell Coffee","Address":"1409 S. Lamar","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75215","Url":"http://www.standardandpours.com","Latitude":32.767786,"Longitude":-96.795817},"Artists":[{"Id":96476,"Name":"Bethel Steele"}],"TicketUrl":""},{"Id":2813467,"Date":"2016-10-02T19:30:00","Venue":{"Id":1486,"Name":"Trees","Address":"2709 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75201","Url":"http://treesdallas.com","Latitude":32.78283,"Longitude":-96.792579},"Artists":[{"Id":117299,"Name":"Gnash"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1243431/tfly?utm_medium=api"},{"Id":2818621,"Date":"2016-10-02T20:00:00","Venue":{"Id":62654,"Name":"House Of Blues","Address":"2200 N. Lamar Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.houseofblues.com/dallas/","Latitude":32.7843,"Longitude":-96.8081},"Artists":[{"Id":102235,"Name":"Catfish and The Bottlemen"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fconcerts.livenation.com%2Fevent%2F0C0050EA0E0F45B3"},{"Id":2840972,"Date":"2016-10-02T20:00:00","Venue":{"Id":135831,"Name":"Three Links Event Center","Address":"2704 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75303","Url":"","Latitude":32.7844141,"Longitude":-96.7844972},"Artists":[{"Id":47894,"Name":"Flatfoot 56"},{"Id":111208,"Name":"Pears"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1306119/tfly?utm_medium=api"},{"Id":2800500,"Date":"2016-10-02T20:00:00","Venue":{"Id":158246,"Name":"Gas Monkey Live!","Address":"10261 Technology Blvd E","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75220","Url":"","Latitude":0,"Longitude":0},"Artists":[{"Id":30055,"Name":"Thrice"},{"Id":53935,"Name":"La Dispute"},{"Id":115333,"Name":"nothing,nowhere."}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1220557/tfly?utm_medium=api"},{"Id":2814189,"Date":"2016-10-03T20:00:00","Venue":{"Id":62654,"Name":"House Of Blues","Address":"2200 N. Lamar Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.houseofblues.com/dallas/","Latitude":32.7843,"Longitude":-96.8081},"Artists":[{"Id":64522,"Name":"Local Natives"},{"Id":114537,"Name":"Charlotte Day Wilson"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fconcerts.livenation.com%2Fevent%2F0C0050E82EB50D9A"},{"Id":2812993,"Date":"2016-10-03T20:00:00","Venue":{"Id":97755,"Name":"Cambridge Room at House of Blues","Address":"2200 N. Lamar Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.houseofblues.com/venues/clubvenues/dallas/","Latitude":32.785335,"Longitude":-96.808253},"Artists":[{"Id":100075,"Name":"July Talk"},{"Id":109144,"Name":"Nothing But Thieves"},{"Id":118015,"Name":"The Wrecks"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3a%2f%2fwww.ticketmaster.com%2fevent%2f0C0050E8334772BF"},{"Id":2811702,"Date":"2016-10-03T20:00:00","Venue":{"Id":17355,"Name":"Granada Theater","Address":"3524 Greenville Ave","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75206","Url":"http://www.granadatheater.com","Latitude":32.830578,"Longitude":-96.770179},"Artists":[{"Id":44998,"Name":"Bear Hands"},{"Id":48474,"Name":"Foals"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1248037/tfly?utm_medium=api"},{"Id":2805605,"Date":"2016-10-03T21:00:00","Venue":{"Id":135831,"Name":"Three Links Event Center","Address":"2704 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75303","Url":"","Latitude":32.7844141,"Longitude":-96.7844972},"Artists":[{"Id":99554,"Name":"Chrome Sparks"},{"Id":117192,"Name":"Roland Tings"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1228041/tfly?utm_medium=api"},{"Id":2824929,"Date":"2016-10-03T22:00:00","Venue":{"Id":134961,"Name":"Sundown at Granada","Address":"3520 Greenville Ave.","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75206","Url":"","Latitude":32.830579,"Longitude":-96.769815},"Artists":[{"Id":102557,"Name":"The Funky Knuckles"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1276109/tfly?utm_medium=api"},{"Id":2827365,"Date":"2016-10-04T00:00:00","Venue":{"Id":62654,"Name":"House Of Blues","Address":"2200 N. Lamar Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.houseofblues.com/dallas/","Latitude":32.7843,"Longitude":-96.8081},"Artists":[{"Id":35589,"Name":"Band of Horses"},{"Id":92112,"Name":"The Wild Feathers"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http://concerts.livenation.com/event/0C0050F8379A0D48"},{"Id":2825026,"Date":"2016-10-04T20:00:00","Venue":{"Id":134961,"Name":"Sundown at Granada","Address":"3520 Greenville Ave.","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75206","Url":"","Latitude":32.830579,"Longitude":-96.769815},"Artists":[{"Id":42624,"Name":"Salim Nourallah"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1276113/tfly?utm_medium=api"},{"Id":2843697,"Date":"2016-10-04T21:00:00","Venue":{"Id":135831,"Name":"Three Links Event Center","Address":"2704 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75303","Url":"","Latitude":32.7844141,"Longitude":-96.7844972},"Artists":[{"Id":78347,"Name":"CoLab"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1312649/tfly?utm_medium=api"},{"Id":2830154,"Date":"2016-10-04T21:00:00","Venue":{"Id":1486,"Name":"Trees","Address":"2709 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75201","Url":"http://treesdallas.com","Latitude":32.78283,"Longitude":-96.792579},"Artists":[{"Id":114811,"Name":"Gallant"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1283193/tfly?utm_medium=api"},{"Id":2840133,"Date":"2016-10-05T00:00:00","Venue":{"Id":97755,"Name":"Cambridge Room at House of Blues","Address":"2200 N. Lamar Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.houseofblues.com/venues/clubvenues/dallas/","Latitude":32.785335,"Longitude":-96.808253},"Artists":[{"Id":34452,"Name":"James Hunter"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F0C00510E260047F9"},{"Id":2812425,"Date":"2016-10-05T20:00:00","Venue":{"Id":62654,"Name":"House Of Blues","Address":"2200 N. Lamar Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.houseofblues.com/dallas/","Latitude":32.7843,"Longitude":-96.8081},"Artists":[{"Id":70192,"Name":"Saint Motel"},{"Id":81719,"Name":"JR JR (formerly Dale Earnhardt Jr. Jr.)"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3a%2f%2fconcerts.livenation.com%2fevent%2f0C0050E7CDB137EB"},{"Id":2811319,"Date":"2016-10-05T20:00:00","Venue":{"Id":1486,"Name":"Trees","Address":"2709 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75201","Url":"http://treesdallas.com","Latitude":32.78283,"Longitude":-96.792579},"Artists":[{"Id":47835,"Name":"The Wombats"},{"Id":94431,"Name":"MONA"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1089901/tfly?utm_medium=api"},{"Id":2818988,"Date":"2016-10-05T20:00:00","Venue":{"Id":17355,"Name":"Granada Theater","Address":"3524 Greenville Ave","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75206","Url":"http://www.granadatheater.com","Latitude":32.830578,"Longitude":-96.770179},"Artists":[{"Id":93985,"Name":"Moosh & Twist"},{"Id":105026,"Name":"Bryce Vine"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1263321/tfly?utm_medium=api"},{"Id":2780900,"Date":"2016-10-05T21:00:00","Venue":{"Id":135831,"Name":"Three Links Event Center","Address":"2704 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75303","Url":"","Latitude":32.7844141,"Longitude":-96.7844972},"Artists":[{"Id":39862,"Name":"Voodoo Glow Skulls"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1190351/tfly?utm_medium=api"},{"Id":2794348,"Date":"2016-10-06T00:00:00","Venue":{"Id":158246,"Name":"Gas Monkey Live!","Address":"10261 Technology Blvd E","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75220","Url":"","Latitude":0,"Longitude":0},"Artists":[{"Id":59861,"Name":"Halestorm"},{"Id":63836,"Name":"Lita Ford"},{"Id":111408,"Name":"Dorothy"}],"TicketUrl":""},{"Id":2814493,"Date":"2016-10-06T00:00:00","Venue":{"Id":110024,"Name":"The Kessler Theater","Address":"1230 W. Davis St.","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75208","Url":"http://www.thekessler.org","Latitude":32.7494971,"Longitude":-96.8425597},"Artists":[{"Id":82800,"Name":"Boy & Bear"}],"TicketUrl":""},{"Id":2839078,"Date":"2016-10-06T19:00:00","Venue":{"Id":60685,"Name":"City Tavern","Address":"1402 Main St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.dallascitytavern.com/","Latitude":32.780434,"Longitude":-96.800366},"Artists":[{"Id":106345,"Name":"Susto"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1302243/tfly?utm_medium=api"},{"Id":2845022,"Date":"2016-10-06T19:00:00","Venue":{"Id":72474,"Name":"The Prophet Bar","Address":"2548 Elm Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75226","Url":"http://www.theprophetbar.com","Latitude":32.783808,"Longitude":-96.787915},"Artists":[{"Id":48800,"Name":"PLUS"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1313841/tfly?utm_medium=api"},{"Id":2806385,"Date":"2016-10-06T19:00:00","Venue":{"Id":154089,"Name":"RBC","Address":"2617 Commerce St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75226","Url":"","Latitude":0,"Longitude":0},"Artists":[{"Id":49229,"Name":"Skeletonwitch"},{"Id":102357,"Name":"Iron Reagan"},{"Id":117201,"Name":"Oathbreaker"},{"Id":117202,"Name":"Gatecreeper"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1236941/tfly?utm_medium=api"},{"Id":2814296,"Date":"2016-10-06T19:30:00","Venue":{"Id":141067,"Name":"Gas Monkey Bar n' Grill","Address":"10261 Technology Blvd E","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75220","Url":"","Latitude":0,"Longitude":0},"Artists":[{"Id":34764,"Name":"Trivium"},{"Id":83682,"Name":"Sabaton"},{"Id":92430,"Name":"Huntress"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1247559/tfly?utm_medium=api"},{"Id":2835814,"Date":"2016-10-06T19:30:00","Venue":{"Id":21259,"Name":"Adair's Saloon","Address":"2624 Commerce St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75201","Url":"http://www.adairssaloon.com","Latitude":32.78253,"Longitude":-96.786479},"Artists":[{"Id":59225,"Name":"Shane Howard Band"}],"TicketUrl":""},{"Id":2774544,"Date":"2016-10-06T20:00:00","Venue":{"Id":97755,"Name":"Cambridge Room at House of Blues","Address":"2200 N. Lamar Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.houseofblues.com/venues/clubvenues/dallas/","Latitude":32.785335,"Longitude":-96.808253},"Artists":[{"Id":95279,"Name":"Foy Vance"},{"Id":117197,"Name":"Trevor Sensor"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3a%2f%2fwww.ticketmaster.com%2fevent%2f0C00509538565E9B"},{"Id":2816048,"Date":"2016-10-06T20:00:00","Venue":{"Id":30011,"Name":"South Side Ballroom","Address":"1135 South Lamar","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75215","Url":"http://www.southsidemusichall.com","Latitude":32.7696,"Longitude":-96.7984},"Artists":[{"Id":92855,"Name":"Schoolboy Q"},{"Id":96316,"Name":"Joey Bada$$"},{"Id":107688,"Name":"Tory Lanez"},{"Id":111907,"Name":"Jacquees"},{"Id":117343,"Name":"VeeCee"},{"Id":117637,"Name":"Kranium"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1258859/tfly?utm_medium=api"},{"Id":2847756,"Date":"2016-10-06T20:00:00","Venue":{"Id":27512,"Name":"Double Wide","Address":"3510 Commerce St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75226","Url":"http://www.double-wide.com/","Latitude":32.784918,"Longitude":-96.774108},"Artists":[{"Id":42624,"Name":"Salim Nourallah"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1319857/tfly?utm_medium=api"},{"Id":2840792,"Date":"2016-10-06T20:00:00","Venue":{"Id":158140,"Name":"The LOT Downtown","Address":"108 S Main St","City":"Mansfield","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"76063","Url":"","Latitude":0,"Longitude":0},"Artists":[{"Id":110062,"Name":"Dalton Domino & The Front Porch Family Band"}],"TicketUrl":""},{"Id":2809154,"Date":"2016-10-06T20:30:00","Venue":{"Id":17355,"Name":"Granada Theater","Address":"3524 Greenville Ave","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75206","Url":"http://www.granadatheater.com","Latitude":32.830578,"Longitude":-96.770179},"Artists":[{"Id":109868,"Name":"Kevin Garrett"},{"Id":113167,"Name":"Oh Wonder"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1240129/tfly?utm_medium=api"},{"Id":2832438,"Date":"2016-10-06T20:30:00","Venue":{"Id":1486,"Name":"Trees","Address":"2709 Elm St","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75201","Url":"http://treesdallas.com","Latitude":32.78283,"Longitude":-96.792579},"Artists":[{"Id":3367,"Name":"Bob Moses"},{"Id":118165,"Name":"Harrison Brome"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1254707/tfly?utm_medium=api"},{"Id":2815608,"Date":"2016-10-06T21:00:00","Venue":{"Id":2999,"Name":"Club DaDa","Address":"2720 Elm Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75226","Url":"http://www.clubdada.com/","Latitude":32.784212,"Longitude":-96.78474},"Artists":[{"Id":10671,"Name":"The Polyphonic Spree"},{"Id":72396,"Name":"Dovehunter"}],"TicketUrl":"http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1257111/tfly?utm_medium=api"},{"Id":2818624,"Date":"2016-10-06T21:00:00","Venue":{"Id":62654,"Name":"House Of Blues","Address":"2200 N. Lamar Street","City":"Dallas","State":"Texas","StateCode":"TX","Country":"US","CountryCode":"US","ZipCode":"75202","Url":"http://www.houseofblues.com/dallas/","Latitude":32.7843,"Longitude":-96.8081},"Artists":[{"Id":28451,"Name":"M83"}],"TicketUrl":"http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3a%2f%2fwww.ticketmaster.com%2fpartner_redirect%3furl%3dhttp%3a%2f%2fconcerts.livenation.com%2fevent%2f0C0050E924C63B59"}]},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"http://api.jambase.com/events?zipCode=75201&radius=25&page=0&api_key=mg7dkv3nzbyb79cdu9gcbesb&o=json","type":"GET","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":"OK"}


   this.getMusicPreviews = () => {
    const promiseArray = [];
    const formattedShowData = JamBaseTestData.data.Events;
    formattedShowData.forEach(event => {
      event.Artists.forEach(function(artist) {
        event.artistData = [];
        const nameQuery = artist.Name.split(" ").join("+");
        promiseArray.push(new Promise((resolve, reject) => {
          $http.jsonp(`https://itunes.apple.com/search?term=${nameQuery}&entity=musicTrack&callback=JSON_CALLBACK`
          ).then(iTunesResponse => {
            //console.log(iTunesResponse);
            let artistArtworkUrl;
            const songPreviews = [];
            const shortenedResponse = iTunesResponse.data.results.slice(0,5);
            if(shortenedResponse[0]) {
              artistArtworkUrl = shortenedResponse[0].artworkUrl100.replace("100x100", "400x400");
            }
            shortenedResponse.forEach(function(song) {
              songPreviews.push({
                songName: song.trackName
                , previewURL: song.previewUrl
              });
            });
            const artistData = {
              name: artist.Name
              , artistArtworkUrl
              , songPreviews
            }
            event.artistData.push(artistData);
            artist.songPreviews = songPreviews;
            $http.post('/api/artist', artistData);
            resolve();
          })
        }));
      });
    });
    return formattedShowData;
  }


}
