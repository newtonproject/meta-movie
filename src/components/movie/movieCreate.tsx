import React, {useState} from "react";
import Link from "next/link";
import { useSecureMovieContract } from "hooks/useContract";
import transactor from "components/transactor";
import { parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { message, Upload } from "antd";
import { UriResolver } from "../../functions/UriResolver";

export default function MovieCreate() {
  const { library } = useWeb3React();
  const FILE_UPLOAD_URL = "https://files.cloud.diynova.com/upload";

  const [tokenVideoIpfsHash, setTokenVideoIpfsHash] = useState("");
  const [tokenCoverIpfsHash, setTokenCoverIpfsHash] = useState("");
  const [tokenTrailorIpfsHash, setTokenTrailorIpfsHash] = useState("");

  const { account } = useWeb3React();
  const secureMovieContract = useSecureMovieContract();
  console.log(`contract`);
  console.log(secureMovieContract);

  const videoUploadProps = {
    name: "saveThisFileSafely",
    action: FILE_UPLOAD_URL,
    showUploadList: false,
    beforeUpload: (file) => {
      const allowedType = ["video/mp4"];
      console.log(file.type);
      if (allowedType.includes(file.type) === false) {
        message.error(`${file.name} is not a valid file.`);
      }
      return allowedType.includes(file.type) ? true : Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status === "done") {
        const cid = info.file.response?.cid;
        console.log("image upload: ", cid);
        setTokenVideoIpfsHash(cid);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log("upload server response:", info.file.response);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const coverUploadProps = {
    name: "saveThisFileSafely",
    action: FILE_UPLOAD_URL,
    showUploadList: false,
    beforeUpload: (file) => {
      const allowedType = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/bmp",
        "image/heic",
      ];
      console.log(file.type);
      if (allowedType.includes(file.type) === false) {
        message.error(`${file.name} is not a valid file.`);
      }
      return allowedType.includes(file.type) ? true : Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status === "done") {
        const cid = info.file.response?.cid;
        console.log("image upload: ", cid);
        setTokenCoverIpfsHash(cid);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log("upload server response:", info.file.response);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }

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

  function createSecureMovie() {
    const toAddress = account;
    const tokenUri = "https://www.newtonproject.org";
    const pricePerTicket = parseEther("100");
    const maxNumberOfTickets = 30; // max 30 ticket
    const duration = 86400; // 24 hours
    transactor(
      secureMovieContract.createSecureMovieAndTickets(
        toAddress,
        tokenUri,
        pricePerTicket,
        maxNumberOfTickets,
        duration
      ),
      () => {}
    );
  }

  return (
    <div className="create">
      <div className="content">
        <Link href="/" passHref>
          <img className="back" src="/assets/image/back.png" alt="back" />
        </Link>
        <div className="cover-container">
          <div className="cover-back">
            <Upload {...coverUploadProps}>
            <div hidden={tokenCoverIpfsHash !== ""}>
            <img
            className="cover-svg"
            src="/assets/image/upload.png"
            alt="cover"
            onClick={() => {}}
          />
              <div className="cover-label">
                  upload a video file
              </div>
              <p>File size limit 10MB</p>
            </div>
            {coverImagePreview}
            </Upload>
          </div>
        </div>

        {/* <div className="cover-container">
          <img
            className="cover"
            src="/assets/image/cover1.png"
            alt="cover"
            onClick={() => {}}
          />
          <button className="preview">Change Cover</button>
        </div> */}

        {/* <label htmlFor="file_upload">
          <Upload {...coverUploadProps} className="text-green-500">
            upload a cover
          </Upload>
        </label> */}
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
        {/* <div className="title">Trailor</div>
        <button className="select-trailor">+ Add Trailor</button>
        <div className="trailor">
          <img
            className="trailor-cover"
            src="/assets/image/cover1.png"
            alt="cover"
          />
          <img className="close" src="/assets/image/close.png" alt="cover" />
        </div> */}
        <div className="title">Blockchain</div>
        <div className="content">Newton</div>
        <div className="title">Valid time</div>
        <div className="content">24 hours</div>
        <div className="title">Price</div>
        <div className="input unit">
          <input className="normal-input" placeholder="The video's price" />
          <div className="new">NEW</div>
        </div>
        <button className="confirm" onClick={() => createSecureMovie()}>
          Confirm
        </button>
      </div>
    </div>
  );
}
