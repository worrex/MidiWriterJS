import {Utils} from '../utils';

/**
 * Holds all data for a "program change" MIDI event
 * @param {object} fields {instrument: integer, delta: integer}
 * @return {ProgramChangeEvent}
 */
class ProgramChangeEvent implements MidiEvent, AbstractEvent {
	channel: number;
    data: number[];
    delta: number;
	status: number;
    type: string;

	fields: {
		channel: number,
		delta: number,
		instrument: number;
	}

	constructor(fields) {
		// Set default fields
		this.fields = Object.assign({
			channel: 0,
			delta: 0x00,
		}, fields);

		this.channel = this.fields.channel;
		this.status = 0xC0;
		this.type = 'program';
		// delta time defaults to 0.
		this.data = Utils.numberToVariableLength(this.fields.delta).concat(this.status | this.channel, this.fields.instrument);
	}
}

export {ProgramChangeEvent};
