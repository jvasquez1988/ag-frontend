import gql from 'graphql-tag';

export const Users = gql` query Users
{
    Users{
     _id
     firstname
     lastname
     age
   }
 }
`

export const updateUser = gql`
mutation updateUser($id:ID, $input:UserInput){
    updateUser(_id:$id, input: $input ){
     _id
     firstname
     lastname
     age
   }
 }
`