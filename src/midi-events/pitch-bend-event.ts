import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Holds all data for a "Pitch Bend" MIDI event
 * [ -1.0, 0, 1.0 ] ->  [ 0, 8192, 16383]
 * @param {object} fields { bend : float, channel : int, delta: int }
 * @return {PitchBendEvent}
 */
class PitchBendEvent implements MidiEvent, AbstractEvent {
	channel: number;
	data: number[];
	delta: number;
	status: 0xE0;
	name: string;

    constructor(fields) {
		this.name = 'PitchBendEvent';
		this.status = 0xE0;
		this.channel = fields.channel || 0;
		this.delta = fields.delta || 0x00;
 
		let bend14 = this.scale14bits(fields.bend);

		let lsbValue = bend14 & 0x7f;          
		let msbValue = ( bend14 >> 7 ) & 0x7f;
		this.data = Utils.numberToVariableLength(this.delta).concat(this.status | this.channel, lsbValue, msbValue);
    }

	scale14bits(zeroOne) {
		if ( zeroOne <= 0 ) {
			return Math.floor( 16384 * ( zeroOne + 1 ) / 2 );
		}
	
		return Math.floor( 16383 * ( zeroOne + 1 ) / 2 );
	}
}

export {PitchBendEvent};
