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


    newProduct(data){
        let query = `
            mutation {
                newProduct(name: "${data.name}", description: "${data.description}"){
                    name
                    description
                }
            }
        `;  
        return this._GQL.mutation(query);

    }
  
  }
  