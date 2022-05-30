import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../constant/connectors";
import { useEagerConnect, useInactiveListener } from "../hooks/useWeb3";
import useBalance from "../hooks/useBalance";
import { formatEther } from "@ethersproject/units";
import { hexAddress2NewAddress, shortAddress } from "../utils/NewChainUtils";
import { TARGET_CHAINID } from "../constant/settings";

export function HiddenAccount() {
  const context = useWeb3React();

  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  const [activatingConnector, setActivatingConnector] = useState();

  const balance = useBalance(library, account);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  return <></>
}

export default function Account() {
  const context = useWeb3React();

  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  const [activatingConnector, setActivatingConnector] = useState();

  const balance = useBalance(library, account);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <div id="connected">
      <Menu as="div">
        {({ open }) => (
          <>
            {active ? (
              <>
                <div className="connected-title connected-account">
                  <Menu.Button className="">
                    <span>
                      {shortAddress(
                        hexAddress2NewAddress(account, TARGET_CHAINID)
                      )}
                    </span>
                    <img
                      className="logo"
                      src="/assets/image/new.png"
                      alt="img"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="connected-content disconnect">
                    <div>
                      <div className="disconnect-header">
                        <img src="/assets/image/newton.png" alt="img" />
                        <span>Newchain测试网</span>
                      </div>

                      <p>
                        {formatEther(balance === undefined ? "0" : balance)} NEW
                      </p>
                      <button onClick={() => deactivate()}>Disconnect</button>
                      {/* <div className="copy">
                        <Paragraph copyable>{shortAddress(hexAddress2NewAddress(account, TARGET_CHAINID))}</Paragraph>
                      </div> */}
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            ) : (
              <>
                <div className="connected-title">
                  <Menu.Button className="">Connect wallet</Menu.Button>
                </div>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="connected-content">
                    <div>
                      <img src="/assets/image/newton.png" alt="img" />
                      <p> Not Connected</p>
                      <button
                        onClick={() => {
                          activate(injected);
                        }}
                      >
                        Connect
                      </button>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}
