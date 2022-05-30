import React from "react";
import Link from "next/link";
import { useSecureMovieContract } from "hooks/useContract";
import transactor from "components/transactor";
import { parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";

export default function MovieCreate() {
  const { account } = useWeb3React();
  const secureMovieContract = useSecureMovieContract();
  console.log(`contract`);
  console.log(secureMovieContract);
  
  function createSecureMovie() {
    const toAddress = account;
    const tokenUri = "https://www.newtonproject.org";
    const pricePerTicket = parseEther("100")
    const maxNumberOfTickets = 30; // max 30 ticket
    const duration = 86400; // 24 hours
    transactor(secureMovieContract.createSecureMovieAndTickets(toAddress, tokenUri, pricePerTicket, maxNumberOfTickets, duration), () => {});
  }

  return (
    <div className="create">
      <div className="content">
        <Link href="/" passHref>
          <img className="back" src="/assets/image/back.png" alt="back" />
        </Link>
        <div className="cover-container">
          <img
            className="cover"
            src="/assets/image/cover1.png"
            alt="cover"
            onClick={() => {}}
          />
          <button className="preview">Change Cover</button>
        </div>
        <div className="title">Name</div>
        <div className="input">
          <input className="normal-input" placeholder="The video's name" />
        </div>
        <div className="title">Description</div>
        <div className="input">
          <textarea
            className="multi-input"
            placeholder="The video's description"
          />
        </div>
        <div className="title">Trailor</div>
        <button className="select-trailor">+ Add Trailor</button>
        <div className="trailor">
          <img
            className="trailor-cover"
            src="/assets/image/cover1.png"
            alt="cover"
          />
          <img className="close" src="/assets/image/close.png" alt="cover" />
        </div>
        <div className="title">Blockchain</div>
        <div className="content">Newton</div>
        <div className="title">Valid time</div>
        <div className="content">24 hours</div>
        <div className="title">Price</div>
        <div className="input unit">
          <input className="normal-input" placeholder="The video's price" />
          <div className="new">NEW</div>
        </div>
        <button className="confirm" onClick={() => createSecureMovie()}>Confirm</button>
      </div>
    </div>
  );
}
