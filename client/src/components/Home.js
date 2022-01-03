import React ,{ Component } from "react";
import KycData from "../contracts/KycData.json";
import getWeb3 from "../getWeb3";
import {useEffect,useState} from "react";
const Home =()=>{
  const {data,setData}= useState({
    web3:null,
    accounts:null,
    contract:null
  })
  const {userData,setUserData}= useState({
      aadharNumber:null,
      panNumber:null,
      aadharImageHash:null,
      panImageHash:null,
      ipAddress:null,
      selfieHash:null,
      location:null,
  })
  useEffect(()=>{
        try{
        // Get network provider and web3 instance.
        // console.log(KycData);
        const wrap =async()=>{
          const web3 = await getWeb3();
  
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = KycData.networks[networkId];
          const contract = new web3.eth.Contract(
            KycData.abi,
            deployedNetwork && deployedNetwork.address,
          );
    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          setData({web3, accounts, contract});
        }
        wrap();
       

        }catch (error) {
        // console.log("er");
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    // };
  },[])
  const verifyCustomer = async()=>{
    const {contract,accounts}=data;
    //code to get data into userData
    setUserData({
      aadharNumber:2,
      panNumber:3,
      aadharImageHash:"ss",
      panImageHash:"ss",
      ipAddress:"ss",
      selfieHash:"ss",
      location:"ss",
    });

    // Stores a given value, 5 by default.
    const {aadharNumber,panNumber,aadharImageHash, panImageHash,ipAddress,selfieHash,location}=userData;
    const result=await contract.methods
      .setkycData(aadharNumber,panNumber,aadharImageHash, panImageHash,ipAddress,selfieHash,location)
      .send({ from: accounts[0] });
    console.log(result);

  }
  
  return (
    <>
    Home
    <button onClick={()=>verifyCustomer()}>verify</button>
    </>
  );
}


  
  export default Home;
  