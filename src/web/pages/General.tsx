import React, { useCallback, useEffect, useRef } from "react";
import { JSONType } from "../../JsonType";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
export const General = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    const Path = useRef<HTMLLabelElement>(null);
    const Gen_pre = () => {
        const gened_pre:JSONType = JSON.parse(JSON.stringify(config));
        return gened_pre;
    }
    function Reload(event: React.ChangeEvent<HTMLInputElement>,option:string) {
        const pre = Gen_pre();
        pre.general[`${option}`] = event.target.checked;
        SetConfig(pre);
    }
    if (!Path) {
        return;
    }
    return (
        <>
            <h1 className="header">General</h1>
            <div className="options">
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                Reload(e, "dl");
                            }}
                        />
                    </label>
                    <label>DL Folder</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                Reload(e, "uploader");
                            }}
                        />
                    </label>
                    <label>Uploader Folder</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                Reload(e, "playlist");
                            }}
                        />
                    </label>
                    <label>Playlist Folder</label>
                </div>
                <div id="path">
                    <label
                        onClick={(event) => {
                            navigator.clipboard.writeText(
                                event.currentTarget.innerHTML
                            );
                            console.log("Path Copied");
                        }}
                        ref={Path}
                    >
                        PATH
                    </label>
                    <button onClick={(event) => {
                        window.api.ResPath((path: string) => {
                            if(Path.current){
                                Path.current.innerText = path;
                            }
                        });
                        window.api.ReqPath()
                    }}>Browse</button>
                </div>
                <button style={{ color: "red" }} onClick={() => {
                    const pre = Gen_pre()
                    pre.general = {
                        dl: false,
                        uploader: false,
                        playlist: false,
                    };
                    SetConfig(pre)
                }}>Reset General</button>
            </div>
        </>
    );
    /*
    window.api.sendpath((path:string)=>{
        console.log(path)
        if (!Path.current){
            return
        }
        Path.current.innerText = path
        _config.dir = path
        window.api.saveconfig(_config)
    })
    window.api.sendconfig((config:JSONType)=>{
        if (!DL.current || !Uploader.current || !Playlist.current || !Path.current){
            return
        }
        console.log(config)
        DL.current.checked = config.general.dl
        Uploader.current.checked = config.general.uploader
        Playlist.current.checked = config.general.playlist
        Path.current.innerText = config.dir
        _config = config
    })
    window.api.getconfig()
    return(
        <>
            <h1 className="header">General</h1>
            
            <div className="options">
                <div className="checkbox">
                    <label className="togglebutton">
                        <input type="checkbox" ref={DL} onChange={(event)=>{
                            _config.general.dl = event.currentTarget.checked
                            window.api.saveconfig(_config)
                        }}/>
                    </label>
                    <label>DL Folder</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input type="checkbox" ref={Uploader} onChange={(event)=>{
                            _config.general.uploader = event.currentTarget.checked
                            window.api.saveconfig(_config)
                        }}/>
                    </label>
                    <label>Uploader Folder</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input type="checkbox" ref={Playlist} onChange={(event)=>{
                            _config.general.playlist = event.currentTarget.checked
                            window.api.saveconfig(_config)
                        }}/>
                    </label>
                    <label>Playlist Folder</label>
                </div>
                <div id="path">
                    <label onClick={(event)=>{
                        navigator.clipboard.writeText(event.currentTarget.innerHTML)
                        console.log("Path Copied")
                    }} ref={Path}>PATH</label>
                    <button onClick={()=>{
                        window.api.getpath()
                    }}>Browse</button>
                </div>
            </div>
        </>
    )
    */
};
