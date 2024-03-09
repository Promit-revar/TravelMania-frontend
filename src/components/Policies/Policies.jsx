import React from "react";
import './Policies.css'
const PoilciesComponent = ({Policies}) => {
    return (
        <div className="policies" id="Policies">
            <div className="title">Policies</div>
            <div className="policy-description">
                <div className="policies-description-left">
                    {Policies.map((policy,i) => {
                        if(i<2){
                            return (
                                <div className="policy">
                                    <div className="policy-title">
                                        {policy.title}
                                    </div>
                                    <ul className="policy-desc">
                                        {policy.desc.map(item=><li style={{ marginBottom: '10px'}}>{item}</li>)}
                                    </ul>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="policies-description-right">
                    {Policies.map((policy,i) => {
                        if(i>2){
                            return (
                                <div className="policy">
                                    <div className="policy-title">
                                        {policy.title}
                                    </div>
                                    <ul className="policy-desc">
                                        {policy.desc.map(item=><li style={{ marginBottom: '10px'}}>{item}</li>)}
                                    </ul>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
};
export default PoilciesComponent;