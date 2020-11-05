import gql from "graphql-tag";

export default class Product {
    constructor(AppConstants, $http, $q, GraphQLClient) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
  
    }
  
    products(){
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


    user(){
        let query = `
            query {
                user(username:"marct"){
                    idsocial
                    username
                    email
                }
            }
        `;  
        return this._GQL.getAuth(query);
    }


    newProduct(data){
        let input = data;
        let query = `
            mutation newProduct($input: NewProduct) {
                newProduct(input: $input) {
                    name
                    description
                }
          }
        `;
        return this._GQL.mutation(query, input);

    }
  
  }
  