// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


contract KycData{

   uint private count;    //total no of customers in blockchain
   constructor(){
      count=0;           //initialize to 0 while deploying 
   }

   //metaData contains who has verified the perticular customer
   struct metaData{                          
      address dataAddedBy;
   }

   //stores kyc data
   struct kycData{                         
      uint aadharNumber;  //optional to store aadharNumber
      uint panNumber;
      string aadharImageHash;
      string panImageHash;
      string ipAddress;
      string selfieHash;
      string location;
   }

   //aadharNumber mapping with kycData
   mapping( uint => kycData) customers; 

   //stores is customer verified or not
   mapping( uint => bool) isVerified;

   //metadata mapping
   mapping(uint=>metaData) verifier;


   //to add data to blockchain
   function setkycData(uint _aadharNumber, uint _panNumber, string memory _aadharImageHash,string memory  _panImageHash,string memory _ipAddress,string memory _selfieHash,string memory _location) public{

      require(!isVerified[_aadharNumber],"This is a verified customer");
      isVerified[_aadharNumber]=true;

      count++;

      verifier[_aadharNumber]= metaData(msg.sender);

      customers[_aadharNumber] = kycData(_aadharNumber,_panNumber,_aadharImageHash,_panImageHash,_ipAddress,_selfieHash,_location);
   }


 //to retrive data back
   function getkycData(uint _aadharNumber) public view returns(kycData memory){

      require(isVerified[_aadharNumber],"Please do KYC!");
      return customers[_aadharNumber];
   }


   //to check verified customer
   function checkIsCustomerVerified(uint _aadharNumber) public view returns (bool) {
      return isVerified[_aadharNumber];
   }

   function getVerifier(uint _aadharNumber) public view returns(address){
      require(isVerified[_aadharNumber],"Customer isn't verified yet");
      return verifier[_aadharNumber].dataAddedBy;
   }
 
}