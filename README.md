```
Category: Social Distancing, Food Delivery
```

# WhatsWhere

We highly recommend you try out our app for yourself. Our app went live today (Friday, August 21st) and is ready to be used by real users and continually iterated on.

WhatsWhere seeks to enable its users to minimize their contact with others while shopping for essentials. All too often we have gone to stores for a product on sale only to find that it is out of stock. Even if you were willing to pay for convenience, you now need to drive to another store and expose yourself to a whole new set of people. This is obviously inconvenient, but in the times we live in, it could even be deadly.

## What's WhatsWhere?

The app simplifies grocery shopping by consolidating your shopping list to the fewest stores possible. This is accomplished through crowdsourced data that our users provide as a community in the demo, but this can just as easily leverage the inventory systems of stores that partner with us. Once our platform gains enough users, stores will be naturally incentivised to provide realtime inventory data.

There are four main features that WhatsWhere has available today, which we hope to augment with more updates in the future.

* Stock level data for nearby stores, with an interactive map to view stores in the area

* A virtual shopping list that allows the user to determine the best store in the area to go to in order to get all of their items

* A recipe browser for easily finding ingredients and adding them to your shopping list

* Pages allowing the users to submit stock level data while at the store

WhatsWhere also provides us insight into local consumer spending habits that can be used to better target other food-related products and services to communities. This data would likely become more valuable than the alternative monetization option of promoted stores. 

## What's the WhatsWhere Score?

The WhatsWhere score is a number from 0-100 that tells the user how desirable a store is based on their shopping list. A score of 100 means that a user can get their shopping list done with ease! The user won't have to worry about picking undesirable produce or fighting over the last bag of chips. We use our proprietary algorithm uses numerous factors to accurately calculate the desirability of each store for each and every user. Simply put, users can always find the store they should go to using the WhatsWhere score.

## Why WhatsWhere?

WhatsWhere was conceived as a means to minimize the contact the users have in public by minimizing their contact with others while shopping for essentials. To achieve this, our app allows a person who might have gone to many grocery stores to find the products they need can now confidently go to a single store and minimize their contact with others. This helps to achieve social distancing by ensuring that people are going to fewer stores, thereby reducing the number of people going to these essential stores that cannot close.

We were also inspired by the toilet paper shortages that struck when the pandemic first emerged. It occured because a few stores ran out of toilet paper, and those few intances being broadcasted in the media and creating panic. With our app, users can see when items are *actually* going out of stock and not become swept up in the panic caused by a few isolated cases of stores running out.

## How did we build it?

Our application requires no code running on our servers, instead leveraging the clients for all code execution which makes it possible to serve the pages entirely statically. This allows out app to be scalable and easily serve more clients with minimal changes to our infrastructure. This also allows for the location of the user to never need to leave their device, with us only handling data related to shopping lists of groceries. 

We leverage Google's Firebase for a realtime shared database holding our data. This data is anonomized such that while everyone can submit entries to the database, other users cannot read other user's data, nor can we see where users are contributing to deduce their locations. This ensures data security of our platform, and allow the public to use our app trusting that we are not able to obtain data that could be considered sensitive.

The frontend is done almost entirely in Bootstrap 4, with some widgets such as the Google Sign-in button being done from scratch (which if nothing else, we're sure we will take away from this project to use in the future). The pages are designed to be responsive and adapt seamlessly to screen sizes from desktop down to mobile. 

We collaborated over Visual Studio Code's Live Share extension and Discord, which we found well suited for having multiple people working on the same files simultaneously, and sharing a local webserver.

## The future of WhatsWhere

We set out to make a product with utility that extends beyond the current pandemic situation we face. Even after the pandemic, our app will still be useful for those who want to be sure of the stock available at stores before they leave the house. With the rise of ecommerce, brick-and-mortar stores will have to leverage their advantage of customers being able to have product in hand without waiting for shipping. Arriving at a grocery store only to find a needed product out of stock damages the experience of stores, and our app is positioned to solve this issue.

We will, in the near future, integrate means of allowing stores to purchase a promoted position in the store listings to drive traffic. This would not change their scores and ensure that our app is still an imparital means of determining if the store has what users need. Additionally, once a region gains enough users, we can begin to monetize the platform. Local grocery stores will be charged a subscription fee to be featured on our app. Most stores in the area will be naturally incentivised to pay this fee as it is needed to stay competitive.

## The Team

#### Dhyey Mehta

In a sort of throw everything at the wall and see what sticks kind of way, Dhyey enjoys playing with different technologies that he has encountered through the years. Although not always the most knowledgeable at first, he strives to learn new things, is quick to adapt to use them, and improve his future projects with them. Combined with a healthy appreciation for teamwork and comedic relief, he is always ready to dive head-first into any project.

#### Ernest Wong

Ernest is a kid at heart and is curious about everything. He’s always asking questions about his interests ranging from new technologies all the way to finance. Being quite involved with his community, he uses his love for learning to help others.

#### George Shao

George is unafraid to take risks and seek new learning opportunities. He enjoys learning about fascinating new technologies, frameworks, and APIs, and employing them in his personal programming projects. In his spare time, George teaches elementary, high school, and university students about robotics and programming.

#### Sean Gordon

Sean makes —but just as often breaks— things in his tech projects. He loves to work with the parts of projects users don't see: infrastructure, backends, and hardware that powers large projects. When the code breaks in an obscure manner and everything isn't working, Sean is the one that finds elegant solutions to otherwise complex problems. 

## Watch the pitch!

[![WhatsWhere Pitch](https://img.youtube.com/vi/Acx27o4kddg/0.jpg)](https://youtu.be/Acx27o4kddg "WhatsWhere Pitch")

## Check out our ad!

[![WhatsWhere Ad](https://img.youtube.com/vi/4K7R4PeUj04/0.jpg)](https://youtu.be/4K7R4PeUj04 "WhatsWhere Ad")
