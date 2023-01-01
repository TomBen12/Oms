# OrderManagementSystem

The order management system allows users to create customers and orders for those customers, and then display 
this information in tables. User creation also has basic validation data is saved in-memory.

##Notes
If console throws CORS error, refresh page and clear cache by holding shift and clicking refresh page in chrome

## Limitations
App still doesnt prevent users from creating multiple customers and users witht he same email, although the database
assigns individual ids and increments them

## Serve
Run `ng serve` for client side to run, and `dotnet watch` in the api folder to launch server side client

## Versions
 - Angular CLI: 15.0.4
 - Node: 16.16.0
 - Package Manager: npm 8.11.0
 - @angular-devkit/core            15.0.4
 - rxjs                            7.5.7
 - typescript                      4.8.4

## Known Errors
- If console shows cors error, clear cache and refresh page

- when deleting orders, page doesnt refresh unless you click out of it then back to it



