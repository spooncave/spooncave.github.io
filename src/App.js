import React from 'react';
import Particles from "react-tsparticles";
import './App.css';
import particlesOptions from "./particles.json";
import { FaTwitter, FaDiscord, FaWatchmanMonitoring } from "react-icons/fa";
import Countdown from 'react-countdown';
import Image from 'react-graceful-image';
import {ethers, utils, formatUnits, commify} from "ethers";
import {useEthers, useEtherBalance, useTokenBalance, useContractFunction, shortenAddress} from "@usedapp/core";
import {ChainId, useContractCalls} from '@usedapp/core';
import {BigNumber} from "@ethersproject/bignumber";
import {Contract} from '@ethersproject/contracts';
import { Interface } from '@ethersproject/abi';


const NFTABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_licenseText","type":"string"}],"name":"licenseisLocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenIndex","type":"uint256"}],"name":"tokenCreated","type":"event"},{"inputs":[],"name":"LICENSE_TEXT","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PROVENANCE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_license","type":"string"}],"name":"admin_changeLicense","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin_flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"value","type":"bool"}],"name":"admin_hide","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin_lockLicense","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_reserveAmount","type":"uint256"}],"name":"admin_reserve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newHiddenBaseURI","type":"string"}],"name":"admin_setHiddenBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"admin_setLowBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"admin_setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"provenanceHash","type":"string"}],"name":"admin_setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hidden","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hiddenBaseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTokenPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numberOfTokens","type":"uint256"}],"name":"mintToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"step","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"tokenLicense","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
    const stopTime = '2021-12-07T17:00:00';
    const [CA, setCA] = React.useState('0x576763FdF5aAbEE12C0587612d714813B6E3A1Ec');
    const {chainId, activateBrowserWallet, account, library, activate, deactivate} = useEthers();
    const [windowSize, setWindowSize] = React.useState(false);
    const [currentSupply, setCurrentSupply] = React.useState(0);
    const [mintState, setMintState] = React.useState(0);
    const [maxSupply, setMaxSupply] = React.useState(10000);
    const [mintPrice, setMintPrice] = React.useState(0);
    const [mintPriceToSend, setMintPriceToSend] = React.useState(0);
    const [ownedTokens, setOwnedTokens] = React.useState(0);
    const [saleIsActive, setSaleIsActive] = React.useState(false);
    const nftInterface = new Interface(NFTABI);
    const [buttonText, setButtonText] = React.useState("Connect");
    const nftContract = new Contract(CA, NFTABI);
    const getTotalSupply = { abi: nftInterface, address: CA, method: 'totalSupply', args: [] };
    const getMaxSupply = { abi: nftInterface, address: CA, method: 'maxSupply', args: [] };
    const getMintPrice = { abi: nftInterface, address: CA, method: 'tokenPrice', args: [] };
    const getSaleIsActive = { abi: nftInterface, address: CA, method: 'saleIsActive', args: [] };
    const getOwnedTokens = { abi: nftInterface, address: CA, method: 'tokensOfOwner', args: [account] };
    const mintFunction = useContractFunction(
        nftContract,
        'mintToken',
        { transactionName: 'Mint' }
    );

    const mintToken = numTokens => {
        try {
            mintFunction.send(BigNumber.from(numTokens), {
                value: mintPriceToSend.toString()
            });
        } catch (error) {
            console.log('error while minting. or after minting. idk.');
            console.log(error ?? "");
        }
    };

    React.useEffect(() => {
        if (chainId === 80001) {
            setCA('0x1c80eE9c3A8409C427D24Bb35C5BA4B39920aF50');
        } else {
            setCA('0x576763FdF5aAbEE12C0587612d714813B6E3A1Ec');
        }
    }, [chainId]);

    const [rawTotalSupply, rawMaxSupply, rawMintPrice, rawSaleIsActive, rawOwnedTokens] = useContractCalls([
        getTotalSupply,
        getMaxSupply,
        getMintPrice,
        getSaleIsActive,
        getOwnedTokens
    ]);

    React.useEffect(() => {
        setCurrentSupply(BigNumber.from(rawTotalSupply?.[0] ?? 0).toString());
        setMaxSupply(BigNumber.from(rawMaxSupply?.[0] ?? 10000).toString());
        setMintPrice(utils.formatEther(BigNumber.from(rawMintPrice?.[0] ?? 0)).toString());
        setMintPriceToSend(BigNumber.from(rawMintPrice?.[0] ?? 0));
        setSaleIsActive(rawSaleIsActive?.[0]);
        setOwnedTokens((rawOwnedTokens?.[0]?.length ?? 0).toString());
    }, [rawTotalSupply, rawMaxSupply, rawMintPrice, rawSaleIsActive, rawOwnedTokens])

    React.useEffect(() => {
        if (mintFunction.state.status !== undefined) {
            console.log(mintFunction.state);
            if (mintFunction.state.status === 'Mining') {
                setMintState(1);
            } else if (mintFunction.state.status === 'Success') {
                setMintState(2);
            } else if (mintFunction.state.status === 'Exception' && mintFunction.state.errorMessage?.includes('insufficient funds')) {
                setMintState(3);
            } else if (mintFunction.state.status === 'Exception' && mintFunction.state.errorMessage?.includes('User denied')) {
                setMintState(4);
            } else {
                setMintState(0);
            }
        }
    }, [mintFunction.state]);

    function adjustedCountdownDate() {
        var targetTime = new Date(stopTime);
        targetTime.setMinutes(targetTime.getMinutes() - targetTime.getTimezoneOffset());
        return targetTime > Date.now() ? targetTime : false;
      }

    async function connectAccount() {
        activateBrowserWallet();
    }

    async function disconnectAccount() {
        deactivate();
    }

    React.useEffect(() => {
        const updateWindowDimensions = () => {
            setWindowSize(window.innerWidth);
        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions)
    }, []);

    async function handleButton() {
        if (![80001, 137].includes(chainId)) { 
            try {
                await library.provider.sendAsync({
                    method: 'wallet_switchEthereumChain',
                    params: [{chainId: '0x89'}], //0x89
                });
            } catch (switchError) {
                console.log(switchError);
                if (switchError.code === 4902) {
                    try {
                        await library.providersendAsync({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x89', // 0x89
                                rpcUrl: 'https://polygon-rpc.com', // https://polygon-rpc.com
                                chainName: 'Polygon', // Polygon
                                nativeCurrency: {
                                    name: 'MATIC',
                                    symbol: 'MATIC', // 2-6 characters long
                                    decimals: 18,
                                },
                                blockExplorerUrl: 'https://polygonscan.com/',
                            }]
                        });
                    } catch (addError) {
                        console.log(addError);
                    }
                }
                // handle other "switch" errors
            }
        } else {
            mintToken(1);
        }
    }

    React.useEffect(() =>{
        if (account && (![137, 80001].includes(chainId))) { //137
            if (windowSize < 600) {
                setButtonText("Wrong N/W");
            } else {
                setButtonText("Wrong Network");
            }
        } else if (account) {
            if (saleIsActive && mintState == 0) {
                setButtonText("Mint");
            } else if (saleIsActive && mintState == 1) {
                setButtonText("Minting...");
            } else if (saleIsActive && mintState == 2) {
                setButtonText("Minted! Want Another?");
            } else if (saleIsActive && mintState == 3) {
                setButtonText("Insufficient Funds. Try Again?")
            } else if (saleIsActive && mintState == 4) {
                setButtonText("TX Rejected. Try Again?")
            } else {
                setButtonText("Minting Soon!");
            }
        } else {
            setButtonText("Connect");
        }
    }, [account, chainId, saleIsActive, mintState])

    return (
        <div className="App">
            
            <Particles options={particlesOptions}/>
            <header className="App-header">
                {account && <div className="account-connected">{shortenAddress(account)}</div>}
                {adjustedCountdownDate() && <div className="countdown-text">
                    <Countdown date={adjustedCountdownDate()}>
                        Mint is live!
                    </Countdown>
                </div>}
                <div className="logo-wrapper"><a href="https://spooncave.com"><Image src="/images/spooncave-logo.png" className="App-logo" alt="logo" placeholderColor="#000000"/></a></div>
                <div className="coming-soon-text">
                    Powered by <a href="https://twitter.com/concavefi" target="_blank">ConcaveFi</a> and&nbsp; 
                    <a href="https://thecolors.art" target="_blank">TheColors</a>
                    </div>
                {account && <div className="coming-soon-text">{currentSupply} / {maxSupply}&nbsp;&nbsp;minted!</div>}
                <span className="socials">
                <a href="https://discord.gg/6KVaykry97"><div className="social-link"><FaDiscord color="white" size="40px"/></div></a>
                        {!account &&
                        <button className={`connect-wallet-button rainbow rainbow-1`}
                            onClick={connectAccount}>Connect Wallet</button>
                        }
                        {account &&
                        <button
                            className={`connect-wallet-button rainbow rainbow-1`}>
                            <span
                                className="theme-gradient ellipses"
                                onClick={handleButton}>{buttonText}</span>
                        </button>
                        }
                    <a href="https://twitter.com/spooncave_nft"><div className="social-link"><FaTwitter color="white" size="40px"/></div></a>
                </span>
                {account && <div className="coming-soon-text">Cost goes up by 1 MATIC every 100 mints. Current Mint Price: {mintPrice}. <br/>You have {ownedTokens} SpoonCaves in your wallet!</div>}
            </header>
            
        </div>
    );
}

export default App;
