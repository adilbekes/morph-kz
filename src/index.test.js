var expect = require('chai').expect;
var morph = require('./index');


describe('morph', function () {
    describe('vowels', function () {
        it('should be an object', function () {
            expect(morph.vowels).to.be.an('object');
        });

        it('should contain `solid`', function () {
            expect(morph.vowels).to.have.property('solid')
        });

        it('   should be an array ', function () {
            expect(morph.vowels.solid).to.be.an('array')
        });

        it('should contain `soft`', function () {
            expect(morph.vowels).to.have.property('soft')
        });

        it('   should be an array ', function () {
            expect(morph.vowels.soft).to.be.an('array')
        });

        it('should contain `both`', function () {
            expect(morph.vowels).to.have.property('both')
        });

        it('   should be an array ', function () {
            expect(morph.vowels.both).to.be.an('array')
        });
    })

    describe('consonants', function () {
        it('should be an object', function () {
            expect(morph.consonants).to.be.an('object');
        });

        it('should contain `unvoiced`', function () {
            expect(morph.consonants).to.have.property('unvoiced')
        });

        it('   should be an array ', function () {
            expect(morph.consonants.unvoiced).to.be.an('array')
        });

        it('should contain `voiced`', function () {
            expect(morph.consonants).to.have.property('voiced')
        });

        it('   should be an array ', function () {
            expect(morph.consonants.voiced).to.be.an('array')
        });

        it('should contain `sonor`', function () {
            expect(morph.consonants).to.have.property('sonor')
        });

        it('   should be an array ', function () {
            expect(morph.consonants.sonor).to.be.an('array')
        });
    })
    describe('endings', function () {
        it('should be an object', function () {
            expect(morph.endings).to.be.an('object');
        });

        it('should contain `plural`', function () {
            expect(morph.endings).to.have.property('plural')
        });

        it('   should be an object ', function () {
            expect(morph.endings.plural).to.be.an('object')
        });

        it('should contain `plural.solid`', function () {
            expect(morph.endings.plural).to.have.property('solid')
        });

        it('   should be an array ', function () {
            expect(morph.endings.plural.solid).to.be.an('array')
        });

        it('should contain `plural.soft`', function () {
            expect(morph.endings.plural).to.have.property('soft')
        });

        it('   should be an array ', function () {
            expect(morph.endings.plural.soft).to.be.an('array')
        });

        it('should contain `belongs`', function () {
            expect(morph.endings).to.have.property('belongs')
        });

        it('   should be an object ', function () {
            expect(morph.endings.belongs).to.be.an('object')
        });

        it('should contain `belongs.vowels`', function () {
            expect(morph.endings.belongs).to.have.property('vowels')
        });

        it('should contain `belongs.consonants`', function () {
            expect(morph.endings.belongs).to.have.property('consonants')
        });
    })
});
