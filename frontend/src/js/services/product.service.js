import gql from "graphql-tag";

export default class Product {
    constructor(AppConstants, $http, $q, GraphQLClient, JWT) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
      this._JWT = JWT;
  
    }
  

    // Return all products
    getProducts(){
        let query = `
            query {
                products{
                    name
                    description
                }
            }
        `;  
        return this._GQL.get(query);
    }


    // Create a product
    newProduct(data){
        let query = `
            mutation {
                newProduct(name:"${data.name}", description:"${data.description}") {
                    name
                    description
                    user{
                        username
                        email
                    }
                }
          }
        `;
        return this._GQL.mutateAuth(query);
    }

  
  }
  