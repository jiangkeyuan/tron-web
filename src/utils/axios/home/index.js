import service from '../request';

const test = async (data)=>{
    return await service.get('http://127.0.0.1:8090/bunny-web3-service/web3/v1/cust/nfts/qty');
}

export {
    test
}