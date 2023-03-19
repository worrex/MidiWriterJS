import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of an instrument name meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {InstrumentNameEvent}
 */
class InstrumentNameEvent implements MetaEvent, AbstractEvent {
	data: number[];
	delta: number;
	name: string;
	type: 0x04;
	text: string;

	constructor(fields: { text: string; delta?: number; }) {
		this.delta = fields.delta || 0x00;
		this.text = fields.text;
		this.name = 'InstrumentNameEvent';
		this.type = 0x04;

		const textBytes = Utils.stringToBytes(this.text);

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(this.delta).concat(
			Constants.META_EVENT_ID,
			this.type,
			Utils.numberToVariableLength(textBytes.length), // Size
			textBytes, // Instrument name
		);
	}
}

export {InstrumentNameEvent};
