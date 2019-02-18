# Backend notes

## Structure

`app.py` is the main router and contains the logic that hands off requests to the specific service. It should only be looking one level deep to identify the correct service.

ie. in a request for `\authentication\user\logout`, the routing should be for `\authentication\<otherpath>` with the request handed to the service for it to deal with. You can read more about wildcard paths [here](http://flask.pocoo.org/docs/0.12/quickstart/#variable-rules)

Services should be in the `\services` directory and be a directory containing a main router and handlers in a `handler` directory. 

ie. in `\services\authentication` there should be `authentication.py` to handle the paths and then subsequent classes in `\services\authentication\handler` which contain actual business logic. `authentication.py` is essentially a facade which exposes only one method, `getResponse` which is `jsonify`ied and returned to the client. 

### Endpoints 

You can find documentation on the endpoints available [here](endpoints.md)

#### Running Development Service

In `/backend` execute `python app.py` to start the development server

#### Deployment 

The backend is automatically deployed to Digital Ocean from `master` when merged. 

## Tests

### Unit Tests

The test framework in use is [pytest](https://docs.pytest.org/en/latest/index.html). 

You should only be writing unit tests for business logic classes and these should therefore by for each file in `\handler` in the format `test_classUnderTest.py` so pytest can autodiscover it.  

Tests are stored in `/backend/backend_tests` in a hierachical format that matches the service/framework structure. 

#### Running Tests

In order to run the test suite, execute `python -m pytest` in `/backend`. 