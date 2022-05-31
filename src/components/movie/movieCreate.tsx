import React, { useState } from "react";
import Link from "next/link";
import { useSecureMovieContract } from "hooks/useContract";
import transactor from "components/transactor";
import { parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { Button, Upload, UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Api } from "services/http";
import { UriResolver } from "../../functions/UriResolver";
import { JSON_UPLOAD_URL } from "constant";
import axios from "axios";
import ipfsClient from "services/ipfs";

export default function MovieCreate() {
  const { library } = useWeb3React();
  const FILE_UPLOAD_URL = "https://files.cloud.diynova.com/upload_json";

  const [tokenVideoIpfsHash, setTokenVideoIpfsHash] = useState("");
  const [tokenCoverIpfsHash, setTokenCoverIpfsHash] = useState("");
  const [tokenTrailorIpfsHash, setTokenTrailorIpfsHash] = useState("");

  // evt information
  const [nftName, setNftName] = useState("");
  const [nftDesc, setNftDesc] = useState("");
  const [nftPurchases, setNftPurchases] = useState("");
  const [nftPrice, setNftPrice] = useState("");

  const { account } = useWeb3React();
  const secureMovieContract = useSecureMovieContract();

  const videoUploadProps = {
    name: "file",
    action: `${Api.baseUrl}${Api.upload}`,
    beforeUpload: (file) => {
      const allowedType = ["video/mp4"];
      if (allowedType.includes(file.type) === false) {
        message.error(`${file.name} is not a valid file.`);
      }
      return allowedType.includes(file.type) ? true : Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.error_code == 1) {
          setTokenVideoIpfsHash(info.file.response.result.cid);
          setTokenCoverIpfsHash(info.file.response.result.cover_cid);
        } else {
          message.error(
            `${info.file.response.error_message} file upload failed.`
          );
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const coverImagePreview =
    tokenCoverIpfsHash === "" ? (
      ""
    ) : (
      <img
        src={UriResolver("ipfs://" + tokenCoverIpfsHash)}
        alt=""
        hidden={tokenCoverIpfsHash === ""}
      />
    );

  async function createSecureMovie() {
    const tokenMetaData = {
      name: nftName,
      description: nftDesc,
      type: "video",
      image: UriResolver("ipfs://" + tokenCoverIpfsHash),
      encrypt: "aes-128",
      video: UriResolver("ipfs://" + tokenVideoIpfsHash),
    };
    try {
      const result = await axios.post("/api/upload", tokenMetaData);
      if (result?.status === 200 && result?.data?.cid) {
        const tokenURI = "ipfs://" + result.data.path;
        console.log("tokenURI:", tokenURI);
        const toAddress = account;
        const pricePerTicket = parseEther(nftPrice);
        const maxNumberOfTickets = nftPurchases; // max 30 ticket
        const duration = 86400; // 24 hours
        transactor(
          secureMovieContract.createSecureMovieAndTickets(
            toAddress,
            tokenURI,
            pricePerTicket,
            maxNumberOfTickets,
            duration
          ),
          () => {}
        );
      }
    } catch (e) {
      console.log(e);
      message.error(`mint error:`, e.message);
    }
  }

  return (
    <div className="create">
      <div className="content">
        <Link href="/" passHref>
          <img className="back" src="/assets/image/back.png" alt="back" />
        </Link>
        <div className="cover-container">
          <div className="cover-back">
            <Upload {...videoUploadProps}>
              <div hidden={tokenCoverIpfsHash !== ""}>
                <img
                  className="cover-svg"
                  src="/assets/image/upload.png"
                  alt=""
                  onClick={() => {}}
                />
                <div className="cover-label">upload a video file</div>
                <p>File size limit 200MB</p>
              </div>
              {coverImagePreview}
            </Upload>
          </div>
        </div>
        <div className="title">Name</div>
        <div className="input">
          <input
            className="normal-input"
            placeholder="The video's name"
            onChange={(e) => {
              setNftName(e.target.value);
            }}
          />
        </div>
        <div className="title">Description</div>
        <div className="input">
          <textarea
            className="multi-input"
            placeholder="The video's description"
            onChange={(e) => {
              setNftDesc(e.target.value);
            }}
          />
        </div>
        <div className="title">Blockchain</div>
        <div className="content">Newton</div>
        <div className="title">Valid time</div>
        <div className="content">24 hours</div>
        <div className="title">Purchases</div>
        <div className="input">
          <input
            className="normal-input"
            placeholder="The video's Purchases"
            onChange={(e) => {
              setNftPurchases(e.target.value);
            }}
          />
        </div>
        <div className="title">Price</div>
        <div className="input unit">
          <input
            className="normal-input"
            placeholder="The video's price"
            onChange={(e) => {
              setNftPrice(e.target.value);
            }}
          />
          <div className="new">NEW</div>
        </div>

        <button className="confirm" onClick={() => createSecureMovie()}>
          Confirm
        </button>
      </div>
    </div>
  );
}
