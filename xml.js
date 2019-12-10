let xmltemplate = `<?xml version="1.0" encoding="UTF-8" ?>
<sheet>
  <whfrpg4e name="Warhammer Fantasy RPG 4th Edition">
    <meta>
    <version>0</version>
    <author></author>
    <contact></contact>
    <notes></notes>
    <released></released>
    <updated></updated>
    </meta>
    <columns>20</columns>
    <section name="characteristics">
      <row>1</row>
      <col>1-20</col>
      <label>
        <max_chars>16</max_chars>
        <value>basic information</value>
        <format>capitalize</format>
      </label>
      <font>CormorantInfant-Medium.ttf</font>
      <group name="some_group">
        <orientation>row</orientation>
        <field name="basics_name">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>40</size>
          <label>
            <max_chars>16</max_chars>
            <position>last</position>
            <value>name</value>
            <format>capitalize</format>
            <size>40</size>
          </label>

        </field>
        <field name="basics_species">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>20</size>
          <label>
            <max_chars>16</max_chars>
            <position>last</position>
            <value>species</value>
            <format>capitalize</format>
            <size>20</size>
          </label>

        </field>
        <field name="basics_class">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>20</size>
          <label>
            <max_chars>16</max_chars>
            <position>last</position>
            <value>class</value>
            <format>capitalize</format>
            <size>20</size>
          </label>

        </field>
        <field name="basics_career">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>20</size>
          <label>
            <max_chars>16</max_chars>
            <position>last</position>
            <value>career</value>
            <format>capitalize</format>
            <size>20</size>
          </label>

        </field>
        <field name="basics_career_level">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>number</type>
          <size>1</size>
          <label>
            <max_chars>2</max_chars>
            <position>last</position>
            <value>career lvl</value>
            <format>capitalize</format>
            <size>1</size>
          </label>
        </field>
        <field name="basics_career_path">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>1</size>
          <label>
            <max_chars>32</max_chars>
            <position>last</position>
            <value>career path</value>
            <format>capitalize</format>
            <size>1</size>
          </label>
        </field>
        <field name="basics_status">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>1</size>
          <label>
            <max_chars>16</max_chars>
            <position>last</position>
            <value>status</value>
            <format>capitalize</format>
            <size>1</size>
          </label>
        </field>
        <field name="basics_age">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>number</type>
          <size>5</size>
          <label>
            <max_chars>3</max_chars>
            <position>last</position>
            <value>age</value>
            <format>capitalize</format>
            <size>5</size>
          </label>
        </field>
        <field name="basics_height">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>number</type>
          <size>5</size>
          <label>
            <max_chars>3</max_chars>
            <position>last</position>
            <value>height</value>
            <format>capitalize</format>
            <size>5</size>
          </label>
        </field>
        <field name="basics_hair">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>1</size>
          <label>
            <max_chars>12</max_chars>
            <position>last</position>
            <value>hair</value>
            <format>capitalize</format>
            <size>1</size>
          </label>
        </field>
        <field name="basics_eyes">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>5</size>
          <label>
            <max_chars>12</max_chars>
            <position>last</position>
            <value>eyes</value>
            <format>capitalize</format>
            <size>5</size>
          </label>
        </field>
        <field name="ws">
          <values>
            <value></value>
            <value></value>
            <value>"0:ws0+ws1"</value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>5</size>
          <label>
            <max_chars>12</max_chars>
            <position>last</position>
            <value>ws</value>
            <format>capitalize</format>
            <size>5</size>
          </label>
        </field>
      </group>
    </section>
    <section name="second section">
      <row>2</row>
      <col>1-10</col>
      <label>
        <max_chars>16</max_chars>
        <value>second section</value>
        <format>capitalize</format>
      </label>
      <group name="group of second section">
        <orientation>row</orientation>
        <field name="sample">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>40</size>
          <label>
            <max_chars>16</max_chars>
            <position>last</position>
            <value>sample</value>
            <format>capitalize</format>
            <size>10</size>
          </label>
        </field>
      </group>
    </section>
    <section name="third section">
      <row>2</row>
      <col>11-20</col>
      <label>
        <max_chars>16</max_chars>
        <value>third section</value>
        <format>capitalize</format>
      </label>
      <group name="group of third section">
        <orientation>row</orientation>
        <field name="sample 2">
          <values>
            <value></value>
          </values>
          <orientation>column</orientation>
          <type>text</type>
          <size>40</size>
          <label>
            <max_chars>16</max_chars>
            <position>last</position>
            <value>sample 2</value>
            <format>capitalize</format>
            <size>10</size>
          </label>
        </field>
      </group>
    </section>
  </whfrpg4e>
</sheet>`;