import React, { useEffect } from "react";
import ScriptTag from 'react-script-tag';
import InnerHTML from 'dangerously-set-html-content'

function FruitNinja(props) {

    useEffect(() => {
        const script = document.createElement('script');

        if ((props.version || 1) == 1) {
            script.src = "scripts/all3.js";
            //replace in mobile app
            //script.src = "scripts/all1.js";
        }
        else {
            script.src = "scripts/all4.js";
            //replace in mobile app
            //script.src = "scripts/all2.js";
        }
            

        script.async = true;

        document.body.appendChild(script);



        const targetNode = document.getElementById('fruit_ninja_score')
        const config = { attributes: true, childList: true, subtree: true };
        const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('okay we are printing ' + targetNode.innerHTML)
                    props.onComplete(parseInt(targetNode.innerHTML))
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
        return () => {
            observer.disconnect();

            document.body.removeChild(script);
        }
    }, []);

    var r=1
    //replace in mobile app
    //var r = document.documentElement.clientHeight * parseFloat(document.getElementById('height_ratio').innerHTML) / 420
    var w = 640 * r 
    var h = 420 * r
    return <div id='fruit_ninja_container_container' style={{display: 'flex', justifyContent: 'center' }}>
    <span id='fruit_ninja_container'>
            <div id="fruit_ninja_extra" width={w} height={h}></div>
            <canvas id="fruit_ninja_view" width={w} height={h}></canvas>
        <div id="fruit_ninja_desc">
	            <div id='fruit_ninja_score'></div>
                <div id="fruit_ninja_browser"></div>
                <div id='fruit_ninja_bombprob_inverse' style={{ display: 'none' }}>{props.bpi || 8}</div>
                <div id='height_ratio' style={{ display: 'none' }}>{1}</div>
                <div id='fruit_ninja_time_limit' style={{ display: 'none' }}>{props.timelimit||3600}</div>

           </div>
        </span >
        </div>

}

export default FruitNinja;
