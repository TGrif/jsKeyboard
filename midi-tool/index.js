
// TODO tests

module.exports = {
  
  
  NOTES: ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'],
  
  MIDI_RANGE: 127,
  
  BASE_OCTAVE: -1,
  
  
  // MIDI_MESSAGES:"Note Off"
  
  /**
  * @param MIDI_msg le signal MIDI (ex. 60 ou 3C)
  * @param format boolean HEXA -> 1, DEC -> 0 (default)
  * @param base_octave int first octave number (ex. -2 -> Range C-2 to G8, -1 -> Range C-1 to G9 - middle C -> C4, default)
  */
  MIDI_to_note: function (MIDI_msg, format, base_octave = this.BASE_OCTAVE) {

    // const midiRange = 127;
    
    if (format) MIDI_msg = parseInt(MIDI_msg, 16);
    
    // let octave = base_octave || -1;
    let noteNum = 0;
    
    
    for (let i = 0; i <= this.MIDI_RANGE; i++) {
      
      if (i === MIDI_msg) return this.NOTES[noteNum] + base_octave;
      
      noteNum++;
      if (noteNum === this.NOTES.length) {
        noteNum = 0;
        base_octave++
      }
    }
    
  },
  
  
  /**
  * @param note la note a convertir (ex. C5 ou A4)
  * @param format boolean HEXA -> 1, DEC -> 0 (default)
  * @param base_octave int first octave number (ex. -2 -> Range C-2 to G8, -1 -> Range C-1 to G9 - middle C -> C4, default)
  */
  note_to_MIDI: function (note, format, base_octave = this.BASE_OCTAVE) {
    
    let note_pitch = note.substr(0, note.length - 1);
    let note_octave = note.charAt(note.length - 1);
    
    let pos = Object.keys(this.NOTES).find(key => this.NOTES[key] === note_pitch);
    let nb_notes_octave = (note_octave - base_octave) * this.NOTES.length;

    let msg = nb_notes_octave + parseInt(pos);
    
    if (format) msg = msg.toString(16).toUpperCase();
    
    if (msg > this.MIDI_RANGE) throw (err);
    return msg;
    
  }
  
}

