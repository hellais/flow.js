describe('FlowFile functions', function() {

  /**
   * @type {Flow}
   */
  var flow;
  /**
   * @type {Flow.FlowFile}
   */
  var file;

  beforeEach(function () {
    flow = new Flow({
    });
    file = new Flow.FlowFile(flow, {
      name: 'image.jpg',
      type: 'image/png'
    });
  });

  it('should get type', function() {
    expect(file.getType()).toBe('png');
    file.file.type = '';
    expect(file.getType()).toBe('');
  });

  it('should get extension', function() {
    expect(file.name).toBe('image.jpg');
    expect(file.getExtension()).toBe('jpg');
    file.name = '';
    expect(file.getExtension()).toBe('');
    file.name = 'image';
    expect(file.getExtension()).toBe('');
    file.name = '.dwq.dq.wd.qdw.E';
    expect(file.getExtension()).toBe('e');
  });

  it('should check the interface of a File to be returned by the fileFactory',
     function() {
      function dummyFileFactory(fileObj) {
        return {
            fileObj: null,
            name: null,
            size: null,
            relativePath: null,
            slice: function(startByte, endByte, fileType) {
              return new Blob(["data"], {'type': fileType});
            }
        } 
      };
      dummyFileFactory.prototype.supportsPrioritizeFirstAndLastChunk = true;

      expect(file.implementsFile(dummyFileFactory())).toBe(true);
  });
});
