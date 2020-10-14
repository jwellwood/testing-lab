import { mockProject } from '../api/project.mock-data';
import { mapProjectFromApiToVm } from '../project.mapper';
import { createEmptyProject } from '../project.vm';

describe('mapProjectFromApiToVm tests', () => {
  test('should return an empty project when called with null or undefined values', () => {
    expect(mapProjectFromApiToVm(null)).toEqual(createEmptyProject());
    expect(mapProjectFromApiToVm(undefined)).toEqual(createEmptyProject());
  });
  test('should return an empty project when called with an empty project', () => {
    expect(mapProjectFromApiToVm(createEmptyProject())).toEqual(
      createEmptyProject()
    );
  });
  test('should merge an empty project if only passed partial data', () => {
    const partialData = {
      id: '1',
      name: 'Name',
      isActive: true,
      employees: [],
    };
    expect(mapProjectFromApiToVm(partialData)).toEqual({
      id: '1',
      name: 'Name',
      isActive: true,
      comments: '',
      externalId: '',
      employees: [],
    });
  });
  test('should map employees', () => {
    const result = mapProjectFromApiToVm(mockProject);
    expect(result.employees).toHaveLength(4);
    result.employees.forEach(employee =>
      expect(Object.keys(employee)).toEqual([
        'id',
        'employeeName',
        'isAssigned',
      ])
    );
  });
  test('should map employees', () => {
    const result = mapProjectFromApiToVm(mockProject);
    expect(result.employees).toHaveLength(4);
    result.employees.forEach(employee =>
      expect(Object.keys(employee)).toEqual([
        'id',
        'employeeName',
        'isAssigned',
      ])
    );
  });
});
