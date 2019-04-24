// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

contract('SolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('testing SolnSquareVerifier', function () {
        beforeEach(async function () {
            VerifierContract = await Verifier.new({
                from: account_one
            });
            this.contract = await SolnSquareVerifier.new(VerifierContract.address, {
                from: account_one
            });

        })
        it('should get token balance', async function () { 
            for(let i = 0;i<5;i++)
            {
                await this.contract.mint(accounts[5],i,"token");
            }
            let balance = await this.contract.balanceOf(accounts[5]);
            assert.equal(balance, 5, "balance should return 1");
        })
        it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function () {
            await this.contract.mint(accounts[1],1,"token");
            let balance = await this.contract.balanceOf(accounts[1]);
            assert.equal(balance, 1, "balance should return 1");
        })

        it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () {

            let CorrectProof = {

                "A": ["0x18cb15e419f2b3f1bff74e3d01896319906543a67564235576c03b540cb3bdc0", "0x2455659458809c615c4f0ddd83f9443a776dbee648642c24d38ab66ff56eab7c"],
                "A_p": ["0x854b63f265137038fae88316d44da0c0a6f4432b43521686e511ddf38bbeb1", "0x1d6a567470674229c8fafa0342956d9f1f86a217847db69647695e5c47d2ef5d"],
                "B": [
                    ["0x518a8334135e97d09d6a0791ce48b0d5e241bf4cb58a35fa5382259ca85a72", "0x87ee242975e7603ce0bf2c3dea4223f55164d5857952a06c2ab088de655834c"],
                    ["0x10df4028796ba2a094f9a0740b9c59cd76a527457b19b369d8c87cb4313daf2", "0x699b91968fc83e436073d61141dd2d20cec30ac362acf0d65665ab1133be5d9"]
                ],

                "B_p": ["0xa994d9759283c1d020d905dd32adca6e9392102d15b120123377dfb7e915ec2", "0x1aeffbd42cf5325003e312b06a33794d119bde476dc6664e4bd2d93cea88b131"],
                "C": ["0x11656a3d163d5d39c7c824f0650529c210672f44241f36c9e3d239cd36a7cab1", "0x89e930064c6179e9d2e8d45e29d4a1d5612e33b9b67662330ae9821cf4ef3b6"],
                "C_p": ["0x2b271649204cd04783a2b5604770d0ffe315c83aba9b77caebad1eefcde6415c", "0xd797cab8463df1f5c89240fe6908b611aa61dd188ee77f532cf2db3032881c4"],
                "H": ["0x26f4637077a3c85a0410b73dc1008b368a5085dcebdce5188ce08bb71abf5f3c", "0x195bf21b970849cbac7b569c43b0e6a1a8df4166b78b82659f4eb59c56ff23a1"],
                "K": ["0x2e438fa61b5196cd724fb192a7a34d35463b7323bda9fced2ab6371fbca00938", "0x10857b51de4665a27ea8fc5b2ad3dad196a2b5961a359e9a3e33ecfcaed3bdeb"],
                "input": [9, 1]

            }
            let tx = await this.contract.mintNFT(accounts[2], 5,CorrectProof.A, CorrectProof.A_p, CorrectProof.B, CorrectProof.B_p, CorrectProof.C, 
                CorrectProof.C_p, CorrectProof.H, CorrectProof.K, CorrectProof.input);
            //console.log(tx.logs[1].event);
            assert.equal(tx.logs[1].event, 'Transfer', "correct proof is not working");




        })


    });
})
