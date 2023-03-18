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
	status: number;
	type: string;

    constructor(fields) {
        // Set default fields
		fields = Object.assign({
			channel: 1,
			delta: 0x00,
		}, fields);

		this.type = 'pitch-bend';
		this.status = 0xE0;
 
		let bend14 = this.scale14bits(fields.bend);
		this.channel = fields.channel || 0;

		let lsbValue = bend14 & 0x7f;          
		let msbValue = ( bend14 >> 7 ) & 0x7f;
		this.data = Utils.numberToVariableLength(fields.delta).concat(this.status | this.channel, lsbValue, msbValue);
    }

	scale14bits(zeroOne) {
		if ( zeroOne <= 0 ) {
			return Math.floor( 16384 * ( zeroOne + 1 ) / 2 );
		}
	
		return Math.floor( 16383 * ( zeroOne + 1 ) / 2 );
	}

	/**
	 * Gets the status code based on the selected channel. 0xC{0-F}
	 * Program change status byte for channel 0 is 0xC0 (192)
	 * 0 = Ch 1
	 * @return {number}
	 */
	getStatusByte(): number {
		return 0xE0 + this.channel - 1
	}
}

export {PitchBendEvent};
