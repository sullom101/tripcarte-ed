## Backend app

Since you didn't provide a wp api that responds with jwt when I request access tokens for a certain user. I have created an express app to make a jwt token and sends it to the front facing app. 

The goal was to simulate wp access tokens to be used in frontend app

## Next js dashboard 

this is a dashboard simulation that's on port 3000 and requests jwt tokens which stores it on coookies. then we can use the token to authorize every request from the app


## Gatsby front 

Since we stored the tokens on our cookies if someone is logged in on next js as well be authorized to use the token on gatsby ecommerce


Task by Ed 