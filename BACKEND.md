# Back-End 🍑

## Necessary Information

This is the information the non-profit has given you about what they want to store:

- `ID`: a unique identifier (required)
- `Requestor Name`: the name of the person who has requested the item (required, between 3-30 characters)
- `Item Requested`: the item that has been requested (required, between 2-100 characters)
- `Created Date`: the date that the item request has been created (required)
- `Last Edited Date`: the date that the item request was last edited (optional)
- `Status`: pending/completed/approved/rejected (required)

Make sure you are returning appropriate HTTP status codes in your responses from the API endpoints. Check out `src/lib/types/apiResponse.ts` for descriptions of status codes.

## Minimum Requirements

### Setup

1. Set up an appropriately-named MongoDB database and connect it to the application.
# done

2. Add a `requests` collection in your database where all item requests will be stored and make sure only data that meets the needed schema can be added to the collection.
# done

### Basic API Endpoints

3. Create `PUT /api/request` which takes in a body in the following format:

```
{
    requestorName: "Jane Doe",
    itemRequested: "Flashlights"
}
```

and adds a new item request to the database. The creation date and last edited date should be set to the current date and the status should be set to `pending`.

4. Create `GET /api/request?page=_` which returns all the item requests in the database in descending order of date created. The data should be paginated- use the `PAGINATION_PAGE_SIZE` constant. If page number is not specified, it should default to one.

## Main Requirements

5. Enable a status query parameter like `GET /api/request?status=pending` which returns all the items with that status sorted by descending date. Pagination should also work with this feature.

6. Create a `PATCH /api/request` that takes in a body of the following format:

```
{
    id: ________,
    status: approved
}
```

and updates the status of the request with the given id. Remember to also modify the last edited date of the request.

## Above and Beyond

7. Enable batch edits and batch deletes of data. Use your own discretion on the way the API endpoint/body is structured but make sure to document the endpoints in `notes.md`.
